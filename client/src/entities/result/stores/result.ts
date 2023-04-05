import { reactive, readonly, ref } from 'vue';
import { defineStore } from 'pinia';

import type { IResult } from '../interfaces';
import { ResultService } from '../services';

/**
 * * Стор для работы с тестами
 */
export const useResultStore = defineStore('result', () => {
  const results = ref<IResult[]>();

  const resultFilter = reactive<{
    schoolId: number | undefined;
    subjectId: number | undefined;
  }>({
    schoolId: undefined,
    subjectId: undefined,
  });

  async function getResults() {
    try
    {
      if(!resultFilter.schoolId || !resultFilter.subjectId) return
      const response = await ResultService.getResults(resultFilter.schoolId, resultFilter.subjectId);
      results.value = response.data;
    } catch (e) {
      console.log(e);
    }
  }

  return {
    results: readonly(results),
    resultFilter,
    getResults,
  };
});
