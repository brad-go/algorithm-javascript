# 서울에 위치한 식당 목록 출력하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131118

## 문제 분류

: SELECT

## 풀이 과정

1. REST_INFO를 INFO로 해서 데이터를 불러온다.
2. REST_INFO와 REST_REVIEW의 REST_ID가 같은 것들만 JOIN을 통해 병합해준다.
3. 주소가 서울로 시작하는 것들만 남긴다.
4. 동일한 REST_ID를 가진 것들을 묶어준다.
5. REST_ID, REST_NAME, FOOD_TYPE, FAVORITES, ADDRESS 컬럼을 선택하고 그룹화해서 묶인 리뷰 평점의 평균을 SCORE로 해서 컬럼을 선택한다.
6. SCORE를 기준으로 내림차순, SCORE가 같다면 FAVORITES를 기준으로 내림차순 정렬해준다.

## 풀이 코드

```sql
SELECT
  INFO.REST_ID,
  INFO.REST_NAME,
  INFO.FOOD_TYPE,
  INFO.FAVORITES,
  INFO.ADDRESS,
  ROUND(AVG(REVIEW_SCORE), 2) AS SCORE
FROM REST_INFO AS INFO
  JOIN REST_REVIEW AS REVIEW ON INFO.REST_ID = REVIEW.REST_ID
WHERE INFO.ADDRESS LIKE '서울%'
GROUP BY REST_ID
ORDER BY SCORE DESC, FAVORITES DESC;
```
