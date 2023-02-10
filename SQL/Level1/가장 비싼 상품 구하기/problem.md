# 가장 비싼 상품 구하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131697

## 문제 분류

: SUM, MAX, MIN

## 풀이 과정

1. PRODUCT에서 데이터 가져오기
2. MAX 함수를 사용해서 PRICE 컬럼 중 가장 높은 값 구하기
3. 컬럼 명을 MAX_PRICE로 해서 출력

## 풀이 코드

```sql
SELECT MAX(PRICE) AS MAX_PRICE
FROM PRODUCT
```
