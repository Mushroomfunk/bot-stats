<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type SortingState,
  createColumnHelper,
  getSortedRowModel,
} from '@tanstack/vue-table';
import { type Bot } from '~/types/Bot';

const { data: botsList, refresh } = await useFetch('/api/okx/tradingBots/grid/active', {
  body: {
    algoOrdType: 'contract_grid',
  },
  method: 'POST',
});

const botsMarkPrice = reactive({});

const botsInstIds = computed(() => botsList.value.data.map((item: Bot) => item.instId));

[...new Set(botsInstIds.value)].forEach((element) => {
  const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        op: 'subscribe',
        args: [
          {
            channel: 'mark-price',
            instId: element,
          },
        ],
      })
    );
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // console.log(data)
    if (data.data) {
      // console.log(data.data[0].markPx);
      botsMarkPrice[element] = data.data[0].markPx;
      // ws.close();
    }
  };
});

const columnHelper = createColumnHelper<Bot>();

const columns = [
  columnHelper.group({
    // header: 'Name',
    id: 'test',
    // footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor((row) => row.instFamily, {
        id: 'instFamily',
        cell: (info) => info.getValue(),
        header: () => h('span', 'Name'),
        // footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.totalPnl, {
        id: 'totalPnL',
        cell: (info) => Number(info.getValue()).toFixed(2),
        header: () => h('span', 'Total PnL'),
      }),
      columnHelper.accessor((row) => row.floatProfit, {
        id: 'floatProfit',
        cell: (info) => Number(info.getValue()).toFixed(2),
        header: () => h('span', 'Floating PnL'),
      }),
      columnHelper.accessor((row) => row.gridProfit, {
        id: 'gridProfit',
        cell: (info) => Number(info.getValue()).toFixed(2),
        header: () => h('span', 'Grid Profit'),
      }),
      columnHelper.accessor((row) => row.limitPrice, {
        id: 'limitPrice',
        enableSorting: false,
        cell: (info) => botsMarkPrice[info.row.original.instId],
        header: () => h('span', 'Limit Price'),
      }),
      columnHelper.accessor((row) => row.liqPx, {
        id: 'liqPx',
        cell: (info) => Number(info.getValue()).toFixed(4),
        header: () => h('span', 'Liq. price'),
      }),
    ],
  }),
];
console.log(botsList.value.data);
const data = computed(() => botsList.value.data ?? []);

const sorting = ref<SortingState>([]);

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns,
  state: {
    get sorting() {
      return sorting.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  debugTable: true,
});

useIntervalFn(() => {
  console.log(`refreshing the data again ${new Date().toISOString()}`);
  refresh(); // will call the 'todos' endpoint, just above
}, 3000); // call it back every 3s
</script>

<template>
  <div>
    <table class="table-auto">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="py-8">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
            :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <template v-if="!header.isPlaceholder">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />

              {{ { asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as string] }}
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in table.getRowModel().rows.slice(0, 10)" :key="row.id" class="py-8">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="px-8">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </td>
        </tr>
      </tbody>

      <!-- <tfoot>
        <tr v-for="footerGroup in table.getFooterGroups()" :key="footerGroup.id">
          <th v-for="header in footerGroup.headers" :key="header.id" :colSpan="header.colSpan">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.footer"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </tfoot> -->
    </table>
  </div>
</template>
