# 카테고리 별 도서 판매량 집계하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/144855

## 문제 분류

: GROUP BY

## 풀이 과정

1. BOOK 테이블의 데이터를 B로 가져온다.
2. BOOK_SALES 테이블의 BOOK_ID와 BOOK 테이블의 BOOK_ID가 같은 데이터들을 병합한다.
3. SALES_DATE가 2022년 1월인 것들만 남긴다.
4. 카테고리별로 묶어준다.
5. 카테고리명과 카테고리별 판매량의 합을 선택한다.
6. 카테고리를 기준으로 오름차순으로 출력한다.

## 풀이 코드

```sql
SELECT CATEGORY, SUM(SALES) AS TOTAL_SALES
FROM BOOK AS B
    JOIN BOOK_SALES AS S ON B.BOOK_ID = S.BOOK_ID
WHERE SALES_DATE LIKE '2022-01%'
GROUP BY CATEGORY
ORDER BY CATEGORY ASC
```
