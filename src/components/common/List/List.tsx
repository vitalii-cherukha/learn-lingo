import { useState } from "react";
import { Teacher } from "../../../types";

import css from "./List.module.css";
import Loader from "../Loader/Loader";
import PageTransition from "../PageTransition/PageTransition";
import BookTrial from "../BookTrial/BookTrial";
import { useAuthStore } from "../../../store/authStore";
import LogIn from "../LogIn/LogIn";
import toast from "react-hot-toast";

interface ListProps {
  teachers: Teacher[];
  loading: boolean;
}

const ITEMS_PER_PAGE = 4;

const List = ({ teachers, loading }: ListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isOpenBookTrial, setIsOpenBookTrial] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [onlineTeacher] = useState(true);
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const visibleTeachers = teachers.slice(0, visibleCount);
  const hasMore = visibleCount < teachers.length;

  const toggleFavorite = useAuthStore((state) => state.toggleFavorite);
  const user = useAuthStore((state) => state.user);

  const handleBookTrial = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsOpenBookTrial(true);
  };

  const toggleExpanded = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <PageTransition>
      <div className={css.listContainer}>
        <ul className={css.list}>
          {visibleTeachers.map((teacher) => {
            const isExpanded = expandedId === teacher.id;
            const isFav = user?.favorites?.includes(teacher.id!) ?? false;

            return (
              <li key={teacher.id} className={css.listItem}>
                <div className={css.imgWrapper}>
                  <img
                    width="96"
                    height="96"
                    src={teacher.avatar_url}
                    alt={teacher.name}
                    className={css.avatar}
                  />
                  <span
                    className={`${css.onlineIcon} ${
                      !onlineTeacher ? css.offlineIcon : ""
                    }`}
                  />
                </div>
                <div className={css.teacherInfo}>
                  <svg
                    onClick={() => {
                      if (!user) {
                        setIsOpenLogIn(true);
                        toast("Please log in first!", {
                          icon: "⚠️",
                          style: {
                            borderRadius: "10px",
                            background: "#e8961bff", // Помаранчевий колір
                            color: "#fff",
                          },
                        });
                        return;
                      }

                      if (!isFav) {
                        toast.success("Added to favorites!");
                      } else {
                        toast("Removed from favorites.", { icon: "🗑️" });
                      }

                      toggleFavorite(teacher.id!);
                    }}
                    className={`${css.favoriteIcon} ${
                      isFav ? css.favoriteIconActive : ""
                    }`}
                    width="26"
                    height="26"
                  >
                    <use href="/sprite.svg#icon-favorite" />
                  </svg>
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

                  {!isExpanded && (
                    <button
                      className={css.btnOpen}
                      onClick={() => toggleExpanded(teacher.id!)}
                    >
                      Read more
                    </button>
                  )}

                  {isExpanded && (
                    <PageTransition>
                      {" "}
                      <div className={css.readMoreWrapper}>
                        <p className={css.readMoreText}>{teacher.experience}</p>
                        <ul className={css.readMoreList}>
                          {teacher.reviews.map((review, index) => (
                            <li key={index} className={css.readMoreItem}>
                              <div className={css.readMoreItemTitleContainer}>
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
                                <div className={css.readMoreComment}>
                                  <p className={css.readMoreCommentText}>
                                    {review.comment}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </PageTransition>
                  )}

                  <ul className={css.levelList}>
                    {teacher.levels.map((level, index) => (
                      <li key={index} className={css.levelItem}>
                        {level}
                      </li>
                    ))}
                  </ul>
                  {isExpanded && (
                    <button
                      onClick={() => handleBookTrial(teacher)}
                      className={css.btnModal}
                      type="button"
                    >
                      Book trial lesson
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {hasMore && (
          <button onClick={handleLoadMore} className={css.btnPagination}>
            Load more
          </button>
        )}
      </div>
      <BookTrial
        isOpen={isOpenBookTrial}
        onClose={() => {
          setIsOpenBookTrial(false);
          setSelectedTeacher(null);
        }}
        teacher={selectedTeacher}
      />
      <LogIn isOpen={isOpenLogIn} onClose={() => setIsOpenLogIn(false)} />
    </PageTransition>
  );
};

export default List;
