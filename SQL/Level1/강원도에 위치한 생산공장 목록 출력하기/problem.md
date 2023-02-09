# 강원도에 위치한 생산공장 목록 출력하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131112

## 문제 분류

: SELECT

## 풀이 과정

1. FOOD_FACTORY 테이블에서 데이터를 불러온다.
2. 주소가 강원도로 시작하는 것들만 남긴다.
3. 공장 ID, 공장 이름, 주소를 선택한다.
4. 공장 ID를 기준으로 오름차순 정렬한다.

## 풀이 코드

```sql
SELECT FACTORY_ID, FACTORY_NAME, ADDRESS
FROM FOOD_FACTORY
WHERE ADDRESS LIKE '강원도%'
ORDER BY FACTORY_ID
```
