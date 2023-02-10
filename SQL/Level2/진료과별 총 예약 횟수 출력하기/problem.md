# 진료과별 총 예약 횟수 출력하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/132202

## 문제 분류

: GROUP BY

## 풀이 과정

1. APPOINTMENT 테이블에서 데이터 가져오기
2. 진료예약일시(APNT_YMD)가 2022년 5월인 예약만 남기기
3. 진료과코드(MCDP_CD) 별로 묶어주기
4. 진료과코드(MCDP_CD)을 진료과코드라는 컬럼명으로 선택, 얘약 날짜(APNT_YMD)의 수를 세서 5월예약건수 라는 컬럼명으로 선택
5. 5월예약건수, 진료과코드 기준으로 오름차순 정렬하기

## 풀이 코드

```sql
SELECT MCDP_CD AS 진료과코드, COUNT(APNT_YMD) 5월예약건수
FROM APPOINTMENT
WHERE APNT_YMD LIKE '2022-05%'
GROUP BY MCDP_CD
ORDER BY 5월예약건수, 진료과코드
```
