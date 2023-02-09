# 재구매가 일어난 상품과 회원 리스트 구하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131536

## 문제 분류

: SELECT

## 풀이 과정

1. ONLINE_SALE 테이블의 데이터를 가져온다.
2. 유저가 상품을 구매한 경우를 얻기 위해 USER_ID와 PRODUCT_ID 기준으로 묶는다.
3. 위처럼 묶었을 때, 동일한 USER_ID의 수가 2 이상이라면 같은 상품을 재구매 한 것이므로, 동일한 USER_ID의 수가 2 이상인 데이터만 남긴다.
4. USER_ID, PRODUCT_ID만 선택한다.
5. USER_ID를 기준으로 오름차순, PRODUCT_ID를 기준으로 내림차순 정렬 해준다.

## 풀이 코드

```sql
SELECT USER_ID, PRODUCT_ID
FROM ONLINE_SALE
GROUP BY USER_ID, PRODUCT_ID
  HAVING COUNT(USER_ID) > 1
ORDER BY USER_ID ASC, PRODUCT_ID DESC
```
