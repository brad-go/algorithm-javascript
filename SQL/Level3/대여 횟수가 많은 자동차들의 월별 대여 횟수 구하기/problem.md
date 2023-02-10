# 대여 횟수가 많은 자동차들의 월별 대여 횟수 구하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/151139

## 문제 분류

: GROUP BY

## 풀이 과정

얼핏보면 쿼리를 통해 한 번에 풀 수 있을 것 같았지만, 서브 쿼리를 이용해서 풀이해야 했다. 또, 서브 쿼리 안에서 조건을 안줘도 된다고 생각했는데, 날짜 조건을 주지 않으면 전체에서 선택하므로 조건을 빼먹으면 안된다.

1. CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블에서 데이터를 가져온다.
2. 렌트 시작일이 연도가 2022이며, 8월에서 10월 사이인 데이터들만 남긴다.
3. CAR_ID가 아래의 서브쿼리와 같은 것들만 남긴다.
   3.1. CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블에서 데이터를 가져온다.
   3.2. 렌트 시작일이 연도가 2022이며, 8월에서 10월 사이인 데이터들만 남긴다.
   3.3. CAR_ID 별로 묶어준다.
   3.4. 대여횟수가 5회 이상인 것만 남긴다.
4. 렌트 시작일의 달과 CAR_ID를 기준으로 그룹화한다.
5. 렌트 시작일의 달로 오름차순, CAR_ID로 내림차순한다.

## 풀이 코드

```sql
SELECT MONTH(START_DATE) AS MONTH, CAR_ID, COUNT(CAR_ID) AS RECORDS
FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
-- 렌트 시작일이 2022년 8월부터 10월 사이인 데이터
WHERE YEAR(START_DATE) = 2022 AND MONTH(START_DATE) BETWEEN 8 AND 10
  -- CAR_ID가 서브쿼리안에 포함되는 것들만 남기기
  AND CAR_ID IN (
    -- CAR_ID를 기준으로 해당 기간 사이에 5회 이상인 데이터만 남겨야 하므로 본 쿼리에서 MONTH, CAR_ID로 그룹화하는 데이터와 다르다. 그러므로 서브쿼리가 필요
    SELECT CAR_ID
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    -- 전체 데이터가 아닌 2022년 8월부터 10월 사이인 데이터에서
    WHERE MONTH(START_DATE) BETWEEN 8 AND 10
    -- 대여횟수가 5회 이상인 데이터만 남긴다.
    GROUP BY CAR_ID HAVING COUNT(CAR_ID) >= 5
  )
-- 렌트 시작 달과 CAR_ID를 기준으로 그룹화한다.
GROUP BY MONTH, CAR_ID
ORDER BY MONTH ASC, CAR_ID DESC
```
