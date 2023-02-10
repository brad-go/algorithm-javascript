# 상위 n개 레코드

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/59405

## 문제 분류

: SELECT

## 풀이 과정

상위 n개 레코드를 출력하기 위해 LIMIT를 사용하면 된다.

1. ANIMAL_INS 테이블에서 데이터를 가져온다.
2. NAME 컬럼만을 선택한다.
3. DATETIME을 기준으로 오름차순 정렬한다.
4. LIMIT를 통해 가장 위의 레코드를 선택한다.

## 풀이 코드

```sql
SELECT NAME
FROM ANIMAL_INS
ORDER BY DATETIME
LIMIT 1
```
