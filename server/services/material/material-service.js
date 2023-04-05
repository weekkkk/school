const { Material, MaterialSubject, Subject } = require('../../models');
const ApiError = require('../../exceptions/api-error');

const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const { subjectMaterialService } = require('../subject');
const { classroomMaterialService } = require('../classroom');
const { MaterialDto } = require('../../dtos');

class MaterialService {
  async create(name, file, subjectId) {
    const materialCondidate = await Material.findOne({ where: { name } });
    if (materialCondidate) {
      throw ApiError.BadRequest(`Тест с таким name ${name} уже существует`);
    }

    const fileName = uuid.v4() + '.docx';
    file.mv(path.resolve(__dirname, '..', '..', 'static', fileName));

    const material = await Material.create({ name, file: fileName });

    const subjectMaterial = await subjectMaterialService.create(subjectId,material.id);
    
    console.log(subjectMaterial.subjectId);

    const subject = await Subject.findByPk(subjectMaterial.subjectId);

    const materialDto = new MaterialDto(material, subject);

    return materialDto;
  }

  async update(id, file) {
    const material = await Material.findByPk(id);
    if (!material) {
      throw ApiError.BadRequest(`Тест с id ${id} не существует`);
    }

    fs.unlink(
      path.resolve(__dirname, '..', '..', 'static', material.file),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Файл успешно удален');
      }
    );

    file.mv(path.resolve(__dirname, '..', '..', 'static', material.file));

    return material;
  }

  async delete(id) {
    const material = await Material.findByPk(id);
    if (!material) {
      throw ApiError.BadRequest(`Тест с id ${id} не существует`);
    }

    try {
      await subjectMaterialService.deleteMaterial(id);
    } catch (e) {
      console.log(e);
    }

    try {
      await classroomMaterialService.deleteMaterial(id);
    } catch (e) {
      console.log(e);
    }

    await Material.destroy({ where: { id } });

    fs.unlink(
      path.resolve(__dirname, '..', '..', 'static', material.file),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Файл успешно удален');
      }
    );
  }

  async getAll() {
    const materials = await Material.findAll();

    const materialsData = [];

    for (let material of materials) {
      const subjectMaterial = await MaterialSubject.findOne({
        where: { materialId: material.id },
      });
      const subject = await Subject.findByPk(subjectMaterial.subjectId);
      const materialDto = new MaterialDto(material, subject);
      materialsData.push(materialDto);
    }

    return materialsData;
  }
}

module.exports = new MaterialService();
