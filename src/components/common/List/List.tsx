import { useState } from "react";
import { Teacher } from "../../../types";

import css from "./List.module.css";
import Loader from "../Loader/Loader";
import PageTransition from "../PageTransition/PageTransition";

interface ListProps {
  teachers: Teacher[];
  loading: boolean;
}

const List = ({ teachers, loading }: ListProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <PageTransition>
      <div className={css.listContainer}>
        <ul className={css.list}>
          {teachers.map((teacher) => (
            <li key={teacher.id} className={css.listItem}>
              <div className={css.imgWrapper}>
                <img
                  width="96"
                  height="96"
                  src={teacher.avatar_url}
                  alt={teacher.name}
                  className={css.avatar}
                />
              </div>
              <div className={css.teacherInfo}>
                <div className={css.teacherContainer}>
                  <div className={css.titleWrapper}>
                    <p className={css.titleText}>Languages</p>
                    <h3
                      className={css.title}
                    >{`${teacher.name} ${teacher.surname}`}</h3>
                  </div>
                  <div className={css.infoWrapper}>
                    <ul className={css.infoList}>
                      <li className={css.infoListItem}>
                        <svg width="16" height="16" className={css.infoIcon}>
                          <use href="/sprite.svg#icon-book" />
                        </svg>
                        <p>Lessons online</p>
                      </li>
                      <li className={css.infoListItem}>
                        Lessons done: {teacher.lessons_done}
                      </li>
                      <li className={css.infoListItem}>
                        <svg
                          className={css.infoIconStar}
                          width="16"
                          height="16"
                        >
                          <use href="/sprite.svg#icon-star" />
                        </svg>
                        Rating: {teacher.rating}
                      </li>
                      <li className={css.infoListItem}>
                        Price / 1 hour:
                        <span className={css.price}>
                          {teacher.price_per_hour}$
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={css.lessonDetailsWrapper}>
                  <ul className={css.lessonDetailsList}>
                    <li className={css.lessonDetailsItem}>
                      Speaks:{" "}
                      <span className={css.lessonDetailsSpan}>
                        {teacher.languages.join(", ")}
                      </span>
                    </li>
                    <li className={css.lessonDetailsItem}>
                      Lesson Info:{" "}
                      <span className={css.lessonDetailsSpan}>
                        {teacher.lesson_info}
                      </span>
                    </li>
                    <li className={css.lessonDetailsItem}>
                      Conditions:{" "}
                      <span className={css.lessonDetailsSpan}>
                        {teacher.conditions}
                      </span>
                    </li>
                  </ul>
                </div>

                <button className={css.btnOpen}>Read more</button>

                <div className={css.readMoreWrapper}>
                  <p className={css.readMoreText}>{teacher.experience}</p>
                  <ul className={css.readMoreList}>
                    {teacher.reviews.map((review, index) => (
                      <li key={index} className={css.readMoreItem}>
                        <div className={css.readMoreItemTitleWrapper}>
                          <div className={css.readMoreItemImgWrapper}>
                            <img
                              width="44"
                              height="44"
                              src="/default-photo.jpg"
                              alt={review.reviewer_name}
                            />
                          </div>
                          <div className={css.ratingWrapper}>
                            <p className={css.readMoreItemTitle}>
                              {review.reviewer_name}
                            </p>
                            <div className={css.readMoreItemRating}>
                              <svg
                                className={css.readMoreItemIcon}
                                width="16"
                                height="16"
                              >
                                <use href="/sprite.svg#icon-star" />
                              </svg>
                              <p className={css.readMoreItemText}>
                                {review.reviewer_rating}.0
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className={css.levelList}>
                  {teacher.levels.map((level, index) => (
                    <li key={index} className={css.levelItem}>
                      {level}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageTransition>
  );
};

export default List;
