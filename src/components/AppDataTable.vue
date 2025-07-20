<script setup lang="ts">
import { computed, nextTick, type PropType, ref, watchEffect } from 'vue'
import type { User } from '@/types'
// @ts-expect-error: Type declarations for '@bhplugin/vue3-datatable' are not resolved correctly.
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import { BDropdown, BDropdownItem } from 'bootstrap-vue-next'
import AppIcon from './AppIcon.vue'
import { useRouter } from 'vue-router'

const columns = [
  { title: 'ORGANIZATION', field: 'organization', sortable: true },
  { title: 'USERNAME', field: 'username', sortable: true },
  { title: 'EMAIL', field: 'email', sortable: true },
  { title: 'PHONE NUMBER', field: 'phoneNumber', sortable: true },
  { title: 'DATE JOINED', field: 'dateJoined', sortable: true },
  { title: 'STATUS', field: 'status', sortable: true },
  { title: '', field: 'actions', sortable: false },
]

const props = defineProps({
  rows: {
    type: Array as PropType<User[]>,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['filterIconClick'])

const router = useRouter()

const contentRef = ref<HTMLElement | null>(null)

const viewDetails = (row: User) => {
  router.push({ name: 'UserDetails', params: { id: row.id } })
}

const blacklistUser = (row: User) => {
  console.log('Blacklist user', row)
  // Implement logic
}

const activateUser = (row: User) => {
  console.log('Activate user', row)
  // Implement logic
}

const isLoading = computed(() => {
  return props.isLoading
})

const funnel = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z" fill="#545F7D"/>
</svg>
`

const trackSortHeaders = () => {
  if (!contentRef.value) return
  const content = contentRef.value

  const tableHeadings = content.querySelectorAll<HTMLTableCellElement>(
    'thead > tr > th:not(:last-child)',
  )
  for (const [index, heading] of tableHeadings.entries()) {
    const column = columns?.[index].field
    const columnName = column?.toString()
    heading.dataset.columnName = columnName

    // Hide sort icons.
    const sort = heading.querySelector('svg') as HTMLElement | null
    if (column) {
      sort?.style.setProperty('display', 'none')
    }
  }
}

/**
 * Adds filter icons to the table headers, excluding those with checkboxes.
 * It attaches click event listeners to the icons for filtering functionality.
 */
const insertHeaderIcons = async () => {
  await nextTick()
  if (!contentRef.value) return

  const content = contentRef.value

  const tableHeadings = content.querySelectorAll<HTMLTableCellElement>(
    'thead > tr > th:not(:last-child)',
  )

  for (const heading of tableHeadings) {
    const container = heading.firstChild as HTMLElement
    const columnName = heading.dataset.columnName

    if (!container || !columnName) continue

    const slotContainer =
      container.querySelector('.app-data-table__filter-icon') ?? document.createElement('span')

    slotContainer.classList.add('app-data-table__filter-icon')

    container.append(slotContainer)

    const funnelSvg = document.createRange().createContextualFragment(funnel).firstChild as Element

    funnelSvg.id = `table-filter-icon-${columnName}`

    // const iconIsActive: boolean = activeFilters.value?.includes(columnName as keyof T)

    const iconCallback = (event: Event) => {
      event.stopPropagation()
      const target = event.currentTarget as Element
      const rect = target.getBoundingClientRect()
      emit('filterIconClick', event, columnName, rect)
    }

    funnelSvg.addEventListener('click', iconCallback)
    funnelSvg.classList.add('data-table__header-icon')

    slotContainer.replaceChildren(funnelSvg)
  }
}

watchEffect(() => {
  if (!contentRef.value || !columns) return

  nextTick(() => {
    trackSortHeaders()
    insertHeaderIcons()
  })
})
</script>

<template>
  <div ref="contentRef" class="app-data-table">
    <Vue3Datatable
      :loading="isLoading"
      :rows="rows"
      :columns="columns"
      :totalRows="rows.length"
      :sortable="false"
      :showFirstPage="false"
      :showLastPage="false"
      :stickyHeader="true"
      :rowsPerPageOptions="[10, 25, 50, 100]"
      @row-click="viewDetails"
    >
      <template #status="data">
        <span
          class="app-data-table__status-pill"
          :class="`app-data-table__status-pill--${(data.value.status as string).toLowerCase()}`"
          >{{ data.value.status }}</span
        >
      </template>
      <template #actions="data">
        <span @click.stop>
          <BDropdown variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <AppIcon name="MoreVertical" />
            </template>
            <BDropdownItem @click="viewDetails(data.value)">
              <AppIcon name="EyeIcon" class="app-data-table__icon" /> View Details
            </BDropdownItem>
            <BDropdownItem
              @click="blacklistUser(data.value)"
              :disabled="data.value.status === 'Blacklisted'"
            >
              <AppIcon name="UserCancel" class="app-data-table__icon" /> Blacklist User
            </BDropdownItem>
            <BDropdownItem
              @click="activateUser(data.value)"
              :disabled="data.value.status === 'Active'"
            >
              <AppIcon name="UserCheck" class="app-data-table__icon" /> Activate User
            </BDropdownItem>
          </BDropdown>
        </span>
      </template>
    </Vue3Datatable>
  </div>
</template>

<style lang="scss">
.app-data-table {
  &__icon {
    width: rem-calc(16px);
    height: rem-calc(16px);
    margin-right: rem-calc(8px);
  }

  &__filter-icon {
    cursor: pointer;
    margin-left: rem-calc(10px);
  }

  thead > tr:is(tr) {
    background-color: $white;
    box-shadow: 0 rem-calc(1px) rem-calc(1px) 0 rgba(0, 0, 0, 0.04);

    th > div {
      @include set-text-style('body-text-xxsm', 'semibold');

      & {
        color: $secondary-text-color;
      }
    }

    th:last-child > div {
      display: none;
    }
  }

  tbody {
    background-color: $white;
    box-shadow: 0 rem-calc(1px) rem-calc(1px) 0 rgba(0, 0, 0, 0.04);

    tr:is(tr) {
      border-color: rgba($color: $primary-text-color, $alpha: 0.1);
      cursor: pointer;
    }

    tr > td:is(td) {
      @include set-text-style('body-text-xsm');

      & {
        color: $secondary-text-color;
        padding-block: rem-calc(20px);
        text-wrap-mode: nowrap;
      }

      .dropdown-toggle {
        &:is(button) {
          padding: 0;
          background-color: transparent;
          border: none;
          outline: none;
          color: $secondary-text-color;

          &:hover {
            color: $primary-text-color;
          }
        }
      }

      .dropdown-menu {
        padding-block: 0;
        border-radius: rem-calc(4px);
        border: rem-calc(1px) solid rgba($color: $secondary-text-color, $alpha: 0.04);
        box-shadow: rem-calc(3px 5px 20px 0) rgba(0, 0, 0, 0.04);
      }

      .dropdown-item {
        @include set-text-style('body-text-xsm', 'medium');

        & {
          padding: rem-calc(15px) rem-calc(20px);
          color: $secondary-text-color;
        }

        &:active {
          background-color: $primary-color;
          color: $white;
        }

        &:disabled {
          color: $gray-shade-300;
          cursor: not-allowed;
        }
      }
    }
  }

  &__status-pill {
    padding: rem-calc(4px) rem-calc(8px);
    border-radius: rem-calc(20px);
    font-size: rem-calc(14px);

    &--active {
      background-color: rgba($color: #39cd62, $alpha: 0.06);
      color: #39cd62;
    }

    &--pending {
      background-color: rgba($color: #ffbb12, $alpha: 0.06);
      color: #ffbb12;
    }

    &--inactive {
      background-color: rgba($color: $secondary-text-color, $alpha: 0.06);
      color: $secondary-text-color;
    }

    &--blacklisted {
      background-color: rgba($color: #e4033b, $alpha: 0.06);
      color: #e4033b;
    }
  }

  .bh-table-responsive {
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .bh-pagination {
    .bh-page-item.previous-page,
    .bh-page-item.next-page {
      background-color: rgba($color: $primary-text-color, $alpha: 0.1);
      width: rem-calc(24px);
      height: rem-calc(24px);
      border-radius: rem-calc(4px);
      border: none;
      color: rgba($color: $primary-text-color, $alpha: 0.6);
    }

    .bh-page-item {
      background-color: transparent;
      color: rgba($color: $secondary-text-color, $alpha: 0.6);
      border: none;
      width: 0;
      margin-left: rem-calc(10px);
    }

    .bh-page-item.bh-active {
      background-color: transparent;
      color: $secondary-text-color;
    }
  }

  .bh-pagination-info {
    color: $secondary-text-color;

    .bh-pagesize {
      background-color: rgba($color: $primary-text-color, $alpha: 0.1);
      color: $primary-text-color;
      padding: rem-calc(7px) rem-calc(12px);
    }
  }
}
</style>
