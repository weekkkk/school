import { $result } from '../api';
import type { IResult } from '../interfaces';

export class ResultService {
  /**
   * * Получить результаты
   */
  static async getResults(schoolId: number, subjectId: number) {
    return $result.get<IResult[]>(`/school/${schoolId}/subject/${subjectId}`);
  }
}
