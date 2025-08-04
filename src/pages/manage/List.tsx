import React, { FC, useState, useEffect, useRef } from "react";
import { useTitle, useRequest } from "ahooks";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import styles from "./common.module.scss";
import { Typography, Spin, Empty } from "antd";
import { getQuestionListService } from "../../services/question";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { useDebounceFn } from "ahooks";
import { useSearchParams } from "react-router-dom";

const rawQuestionList = [
  {
    _id: "q1",
    title: "What is React?",
    isPublished: false,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
  {
    _id: "q2",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
  {
    _id: "q3",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
  {
    _id: "q4",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: true,
  },
  {
    _id: "q5",
    title: "What is React?",
    isPublished: true,
    answerCount: 2,
    createdAt: "2022-01-01",
    isStar: false,
  },
];
const { Title } = Typography;

const List: FC = () => {
  // 设置页面标题
  useTitle("问卷星-问卷列表");

  // const [questionList, setQuestionList] = useState(rawQuestionList);

  //useRequest （分页的方式）
  // const { data = {}, loading } = useLoadQuestionListData();
  // const { list = [], total = 0 } = data;

  // const handleStar = (_id: string) => {
  //   const newQuestionList = questionList.map((item) => {
  //     return item._id === _id ? { ...item, isStar: !item.isStar } : item;
  //   });
  //   setQuestionList(newQuestionList);
  // };

  //改造成下拉加载更多的方式
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]); //累计的加载数据，越来越多
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams();

  const containerRef = useRef<HTMLDivElement>(null);

  //带keyword搜索需要重置信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [searchParams.get("keyword")]);

  //真正发送请求加载数据
  const {
    run: load,
    loading,
    data,
  } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: 10,
        keyword: searchParams.get("keyword") || "",
      });
      return data;
    },
    {
      manual: true, //手动触发
      onSuccess: (data) => {
        const { list: newList = [], total = 0 } = data;
        setList(list.concat(newList));
        setTotal(total);
        setPage(page + 1);
      },
    }
  );

  //加载更多数据的函数
  const loadMore = async () => {
    // console.log(containerRef.current);
    if (containerRef.current === null) return;
    //important 如果loadmore那个div（全部）露出来，那么加载数据
    if (
      containerRef.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      // console.log("loadMore");
      // console.log(containerRef.current.getBoundingClientRect().bottom);
      // console.log(document.body.clientHeight);
      // console.log(window.innerHeight);
      load(); //真正加载数据;
      setStarted(true);
    }
  };
  //防抖
  const { run: loadMoreDebounce } = useDebounceFn(loadMore, { wait: 1000 });

  //1. 当keyword搜索关键词变化时，要重新获取新的数据
  useEffect(() => {
    loadMoreDebounce();
  }, [searchParams]);

  //2. 当页面滚动时，要获取新的数据
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", () => {
        loadMoreDebounce();
      });
    }

    return () => {
      //记得移除
      window.removeEventListener("scroll", () => {
        loadMoreDebounce();
      });
    };
  }, [searchParams, haveMoreData]);

  const LoadMoreEle = () => {
    if (!started || loading) return <Spin />;
    if (!haveMoreData) return <span>没有更多了</span>;
    if (total === 0) return <Empty />;
    return <span>加载更多...</span>;
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>

      <div className="content">
        <div>
          {list.length > 0 &&
            list.map((q: any) => {
              return <QuestionCard key={q._id} {...q} />;
            })}
        </div>
      </div>

      <div className="footer" style={{ textAlign: "center" }}>
        <div ref={containerRef}>{LoadMoreEle()}</div>
      </div>
    </>
  );
};

export default List;
