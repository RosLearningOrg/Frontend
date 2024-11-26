import note from "";

function CourseContainer() {
  return (
    <div
      href="lessons.html"
      className="course-item container"
      draggable="false"
    >
      <div className="course-item-info">
        <p className="course-item-title">Название курса</p>
        <p className="hint course-item-desc">Описание курса</p>
      </div>
      <p className="course-item stats">2 / 15</p>
    </div>
  );
}

function LessonContainer() {
  return (
    <div>
      <div href="tasks.html" class="lesson-item container" draggable="false">
        <div class="lesson-item-info">
          <p class="lesson-item-title">Название темы</p>
          <p class="lesson-item-desc hint">Описание темы</p>
        </div>
        <div class="icon-container open-materials-btn">
          <img class="lesson-item-materials-icon" src={note} alt="" />
          <p class="lesson-item stats">2 / 15</p>
        </div>
      </div>
    </div>
  );
}

export default function Lessons() {
  return (
    <>
      <CourseContainer />
      <br />
      <LessonContainer />
    </>
  );
}
