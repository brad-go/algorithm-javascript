# 입양 사각 구하기 2

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/59413

## 문제 분류

: GROUP BY

## 풀이 과정

WITH RECURSIVE 없이 문제를 풀이하려고 했는데, ANIMAL_OUTS 테이블에 HOUR 데이터가 0 - 23 을 모두 표현할 수 없었다.
그래서 WITH RECURSIVE 문을 이용해 0 - 23 까지의 행을 가진 컬럼 HOUR를 가진 임시 테이블을 만들어줌으로 해결할 수 있었다.

1. WITH RECURSIVE를 이용해 0-23까지의 행을 가진 컬럼 HOUR를 가진 임시 테이블 TIME을 생성한다.
2. TIME의 데이터를 모두 가져온다.
3. ANIMAL_OUTS 테이블의 DATETIME의 시간 값이 TIME 테이블의 HOUR 값과 같은 것을 병합한다. 이때 LEFT 조인을 하는데 ANIMAL_OUTS에 없는 행도 포함해야 하기 때문이다.
4. HOUR를 기준으로 그룹화해준다.

## 풀이 코드

```sql
# 0-23까지 행을 가진 테이블 생성
WITH RECURSIVE TIME AS (
    SELECT 0 AS HOUR
    UNION ALL
    SELECT HOUR + 1 FROM TIME WHERE HOUR < 23
)

SELECT TIME.HOUR, COUNT(ANIMAL_OUTS.DATETIME) AS COUNT
FROM TIME
    LEFT JOIN ANIMAL_OUTS ON TIME.HOUR = HOUR(ANIMAL_OUTS.DATETIME)
GROUP BY HOUR
```
