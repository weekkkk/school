const { MaterialSubject } = require('../../../models');
const ApiError = require('../../../exceptions/api-error');

class SubjectMaterialService {
  async create(subjectId, materialId) {
    const subjectMaterialCondidate = await MaterialSubject.findOne({
      where: { materialId },
    });
    if (subjectMaterialCondidate) {
      throw ApiError.BadRequest(
        `Материал с id ${materialId} уже обладает предметом`
      );
    }

    const subjectMaterial = await MaterialSubject.create({
      subjectId,
      materialId,
    });
    return subjectMaterial;
  }

  async deleteSubject(subjectId) {
    const subjectMaterial = await MaterialSubject.findOne({
      where: { subjectId },
    });
    if (!subjectMaterial) {
      throw ApiError.BadRequest(`Предмет с id ${subjectId} не создан`);
    }

    await MaterialSubject.destroy({
      where: { subjectId },
    });
  }

  async deleteMaterial(materialId) {
    const subjectMaterial = await MaterialSubject.findOne({
      where: { materialId },
    });
    if (!subjectMaterial) {
      throw ApiError.BadRequest(`Тест с id ${materialId} не создан`);
    }

    await MaterialSubject.destroy({
      where: { materialId },
    });
  }
}

module.exports = new SubjectMaterialService();
