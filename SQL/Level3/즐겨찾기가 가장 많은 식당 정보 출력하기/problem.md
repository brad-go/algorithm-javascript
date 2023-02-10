# 즐겨찾기가 가장 많은 식당 정보 출력하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131123

## 문제 분류

: GROUP BY

## 풀이 과정

GROUP BY절 이후 HAVING절을 이용해서 문제를 풀이하려고 했지만, 제대로 동작하지 않았다.
서브 쿼리르 사용해서 풀 수 있었는데, 서브 쿼리를 사용해야 하는 이유는 다음과 같다.
FOOD_TYPE으로 그룹화하고 HAVING을 사용하면 FAVORITES는 제대로 출력할 수 있다. 그러나 REST_ID와 REST_NAME은 선택의
기준이 없으므로 랜덤한 값(?)을 출력하게 된다.
그러므로 서브쿼리를 이용해 MAX(FAVORITES) 값을 구해주고 해당 값들에 속하는 FAVORITES들만 남겨서 풀이해야 한다.

1. REST_INFO 테이블의 데이터를 가져온다.
2. FAVORITES가 서브 쿼리의 데이터에 포함되는 것들만 남긴다.
3. 서브쿼리는 REST_INFO 테이블에서 FOOD_TYPE을 기준으로 가장 큰 FAVORITES들을 가져온다.
4. FOOD_TYPE 별로 묶어준다.
5. FOOD_TYPE, REST_ID, REST_NAME, FAVORITES를 선택한다.
6. FOOD_TYPE을 기준으로 내림차순한다.

## 풀이 코드

```sql
SELECT FOOD_TYPE, REST_ID, REST_NAME, FAVORITES
FROM REST_INFO
WHERE FAVORITES IN (
    SELECT MAX(FAVORITES) FROM REST_INFO GROUP BY FOOD_TYPE
)
GROUP BY FOOD_TYPE
ORDER BY FOOD_TYPE DESC
```
