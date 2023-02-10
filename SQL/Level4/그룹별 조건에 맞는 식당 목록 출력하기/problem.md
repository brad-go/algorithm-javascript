# 그룹별 조건에 맞는 식당 목록 출력하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131124

## 문제 분류

: JOIN

## 풀이 과정

1. MEMBER_PROFILE의 데이터를 가져온다.
2. REST_REVIEW와 병합해준다.
3. MEMBER_PROFILE의 MEMBER_ID가 서브쿼리와 같은 것만 남긴다.
4. 서브 쿼리는 REST_REIVEW에서 MEMBER_ID별로 그룹화한 후 MEMBER_ID를 선택, COUNT를 내림차순해주고 맨 위의 데이터를 가져온다. 즉, 가장 리뷰 수가 많은 사용자의 MEMBER_ID를 가져온다.
5. REVIEW_DATE, REVIEW TEXT 기준으로 오름차순 정렬한다.

## 풀이 코드

```sql
SELECT MEMBER_NAME, REVIEW_TEXT, DATE_FORMAT(R.REVIEW_DATE, '%Y-%m-%d') AS REVIEW_DATE
FROM MEMBER_PROFILE AS M
    JOIN REST_REVIEW AS R ON M.MEMBER_ID = R.MEMBER_ID
WHERE M.MEMBER_ID = (
    SELECT MEMBER_ID
    FROM REST_REVIEW
    GROUP BY MEMBER_ID
    ORDER BY COUNT(MEMBER_ID) DESC
    LIMIT 1
)
ORDER BY REVIEW_DATE, REVIEW_TEXT
```
