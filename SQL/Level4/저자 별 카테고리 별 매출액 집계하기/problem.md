# 저자 별 카테고리 별 매출액 집계하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/144856

## 문제 분류

: GROUP BY

## 풀이 과정

1. BOOK_SALES 테이블에서 데이터를 가져온다.
2. BOOK 테이블에서 BOOK_SALES의 BOOK_ID와 같은 BOOK_ID를 가진 데이터를 JOIN한다.
3. AUTHOR 테이블에서 AUTHOR_ID가 BOOK의 AUTHOR_ID와 같은 데이터를 JOIN한다.
4. SALES_DATE가 2022년 1월인 것만 남긴다.
5. 저자별, 카테고리별 매출액을 구해야 하므로 AUTHOR_ID, CATEGORY로 그룹화해준다.
6. AUTHOR_ID, AUTHOR_NAME, CATEGORY, TOTAL_SALES를 선택한다.
7. TOTAL_SALES는 그룹화된 데이터에서 SALES \* PRICE의 합으로 계산한다.
8. AUTHOR_ID를 기준으로 오름차순, AUTHOR_ID가 같다면 CATEGORY를 기준으로 내림차순한다.

## 풀이 코드

```sql
SELECT A.AUTHOR_ID, A.AUTHOR_NAME, B.CATEGORY, SUM(S.SALES * B.PRICE) AS TOTAL_SALES
FROM BOOK_SALES AS S
  JOIN BOOK AS B ON S.BOOK_ID = B.BOOK_ID
  JOIN AUTHOR AS A ON B.AUTHOR_ID = A.AUTHOR_ID
WHERE SALES_DATE LIKE '2022-01%'
GROUP BY A.AUTHOR_ID, B.CATEGORY
ORDER BY A.AUTHOR_ID ASC, CATEGORY DESC
```
