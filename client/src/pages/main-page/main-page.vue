<template>
  <div class="main">
    <img src="../../app/assets/images/banner.png" alt="banner" />
    <div class="main-header">
      Системы для подготовки
      <br />
      (Авторы вариантов)
    </div>
    <div class="authors">
      <div class="author">
        <img src="../../app/assets/images/solve.png" alt="solve" />
        <div class="author-name">Решу ЕГЭ</div>
        <div class="author-description">
          Дистанционная обучающая система для подготовки к государственным
          экзаменам «РЕШУ ЕГЭ» и «РЕШУ ОГЭ» создана творческим объединением под
          руководством Гущина Д. Д., учителя математики, физики и информатики.
        </div>
      </div>
      <div class="author">
        <img src="../../app/assets/images/unknown.png" alt="unknown" />
        <div class="author-name">Незнайка</div>
        <div c lass="author-description">
          Позволяет подготовиться к ЕГЭ и ОГЭ полностью самостоятельно без
          репетиторов и приобретения каких-либо курсов. В сообществе публикуется
          информация об обновлениях сайта, а также полезные материалы.
        </div>
      </div>
      <div class="author">
        <img src="../../app/assets/images/fipi.png" alt="fipi" />
        <div class="author-name">ФИПИ</div>
        <div class="author-description">
          Форма государственной итоговой аттестации по образовательным
          программам среднего общего образования (ГИА). Основной государственный
          экзамен. Итоговый экзамен за курс основного общего образования в
          России.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.main {
  color: var(--color-text);

  & > img {
    max-width: 100%;
    height: 232px;
    position: absolute;
    left: 0;
    top: 0;
    border-top-left-radius: var(--border-radius-default);
    border-top-right-radius: var(--border-radius-default);
  }

  .main-header {
    margin: 256px 0 24px;
    font-weight: 600;
    font-size: 24px;
    text-align: center;
  }

  .authors {
    display: flex;
    gap: 24px;

    .author {
      display: flex;
      flex-direction: column;
      gap: 8px;

      & > img {
        max-width: 100%;
        height: 160px;
      }

      .author-name {
        font-weight: 600;
        font-size: 24px;
        color: var(--color-active);
      }

      .author-description {
        font-weight: 400;
        font-size: 16px;
      }
    }
  }
}
</style>
