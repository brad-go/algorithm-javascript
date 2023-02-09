# 과일로 만든 아이스크림 고르기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/133025

## 문제 분류

: SELECT

## 풀이 과정

FIRST_HALF와 ICECREAM_INFO 두 개의 테이블 있다.
FIRST_HALF 테이블의 FLAVOR는 ICECREAM_INFO 테이블의 FLAVOR의 외래 키다.
ICECREAM_INFO의 기본 키는 FLAVOR다.

1. 두 개의 테이블을 각 F, I로 지정하기
2. FIRST_HALF에서 FLAVOR 추출하기
3. 조건은 ICECREAM_INFO와 같은 FLAVOR이며, 총 주문량이 3000이 넘고 종류가 fruit_based인 것을
4. 총 주문량을 기준으로 내림차순 정렬하기

## 풀이 코드

```sql
-- 두 개의 테이블을 편의상 F, I로 지정하고 FIRST_HALF 테이블의 FLAVOR를 추출하기
SELECT F.FLAVOR
FROM FIRST_HALF AS F, ICECREAM_INFO AS I,
-- FIRST_HALF의 FLAVOR가 ICECREAM_INFO의 FLAVOR와 같고
-- 총 주문량이 3000이 넘으며 (FIRST_HALF에서 TOTAL_ORDER)
-- 아이스크림이 과일 베이스인 (ICECREAM_INFO에서 INGREDIENT_TYPE) FLAVOR들만
WHERE F.FLAVOR = I.FLAVOR AND F.TOTAL_ORDER > 3000 AND I.INGREDIENT_TYPE = 'fruit_based'
-- TOTAL_ORDER를 기준으로 내림차순 정렬
ORDER BY TOTAL_ORDER DESC
```

## 다른 풀이

FLAVOR가 ICECREAM_INFO의 기본키이고, FIRST_HALF의 FLAVOR가 ICECREAM_INFO의 FLAVOR의 외래키인 기본키 외래키 관계이기 때문에
INNER JOIN을 사용해서 문제를 풀이할 수 있었다.

```sql
SELECT F.FLAVOR
FROM FIRST_HALF AS F
JOIN ICECREAM_INFO AS I ON F.FLAVOR = I.FLAVOR
WHERE F.TOTAL_ORDER > 3000 AND I.INGREDIENT_TYPE = 'fruit_based'
ORDER BY TOTAL_ORDER DESC
```
