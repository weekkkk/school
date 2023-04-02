<template>
    <div ref="$el" :class="componentClass" @click="onClick">
        <div v-html="currentItemName" />
        <div class="dropdown-items-wrapper" v-if="isOpen">
            <div class="dropdown-item" v-for="item in items" @click="dropdownItemOnClick(item.Id)">
                {{ item.Name }}
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, type PropType, ref } from 'vue';

/**Параметры компонента */
const props = defineProps({
    /**Список  */
    items: { type: Object as PropType<{ Id: number, Name: string }[]>, default: () => [] },
    /**Выбранный элемент */
    selectedId: { type: Number, default: null }
})
/**События компонента */
const emit = defineEmits(["select"]);

/**Открыт ли выпадающий список */
const isOpen = ref(false);
/**DOM элемент компонента */
const $el = ref<HTMLDivElement>(null)

/**Название выбранного элемента */
const currentItemName = computed(() => props.items.find(x => x.Id == props.selectedId)?.Name || "");
/**Класс компонента */
const componentClass = computed(() => ({
    "ui-dropdown": 1,
    "open": isOpen.value
}))

/**После рендера компонента */
onMounted(() => document.addEventListener("click", documentOnClick))

/**При клике вне компонента выпадающий список закрывается */
function documentOnClick(event: MouseEvent) {
    let target = event.target as HTMLElement;
    let el = $el.value;
    if (target && el && target != el && !el.contains(target)) isOpen.value = false;
}
/**Выбор элемента из списка */
const dropdownItemOnClick = (id: number) => emit("select", id)
/**Переключение видимости выпадающего списка, при клике по компоненту */
const onClick = () => isOpen.value = !isOpen.value;
</script>
<style lang="less" scoped>
.ui-dropdown {
    display: flex;
    align-items: center;
    position: relative;
    outline: none;
    height: 40px;
    border: 1px solid var(--color-gray);
    border-radius: var(--border-radius-default);
    transition: border-color .2s ease;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
    cursor: pointer;

    &:hover,
    &.active,
    &:focus,
    &.open {
        border-color: var(--color-active);
    }

    &.open {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: none;
    }

    .dropdown-items-wrapper {
        position: absolute;
        width: calc(100% + 2px);
        top: 100%;
        left: -1px;
        background-color: var(--color-default);
        border: 1px solid var(--color-active);
        border-top: none;
        border-bottom-left-radius: var(--border-radius-default);
        border-bottom-right-radius: var(--border-radius-default);
        overflow: hidden;

        .dropdown-item {
            padding: 0 16px;
            font-size: 16px;
            font-weight: 500;
            min-height: 40px;
            display: flex;
            align-items: center;

            &:hover {
                background-color: var(--color-light-gray);
            }
        }
    }
}
</style>