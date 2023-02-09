# 인기있는 아이스크림

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/133024

## 문제 분류

: SELECT

## 풀이 과정

총 주문량을 기준으로 내림차순 정렬하고, 총 주문량이 같다면 출하 번호를 기준으로 오름차순으로 정렬해야 했다.
정렬할 때, 비교값이 같다면을 어떻게 작성해야 할지 몰랐지만, 문제 풀이를 통해 알 수 있었다. 콤마(,) 뒤에 정렬 방식을 한번 더 적으면 되었다.

1. 테이블에서 아이스크림의 맛(FLAVOR)을 선택한다.
2. 총 주문량(TOTAL_ORDER)을 기준으로 내림차순으로 정렬한다.
3. 출하 번호(SHIPMENT_ID)를 기준으로 오름차순으로 정렬한다.

## 풀이 코드

```sql
SELECT FLAVOR
FROM FIRST_HALF
ORDER BY TOTAL_ORDER DESC, SHIPMENT_ID ASC
```
