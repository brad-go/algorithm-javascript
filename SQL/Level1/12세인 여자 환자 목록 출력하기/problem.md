# 12세인 여자 환자 목록 출력하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/132201

## 문제 분류

: SELECT

## 풀이 과정

1. PATIENT 테이블의 데이터를 가져온다.
2. AGE가 12이하이며 GEND_CD가 W인 데이터만 남긴다.
3. PT_NAME, PT_NO, GEND_CD, AGE, TLNO 컬럼을 선택한다.
4. TNLO가 NULL이라면 'NONE'으로 출력한다.
5. AGE를 기준으로 내림차순 정렬하고 AGE가 같다면 PT_NAME을 기준으로 오름차순 정렬한다.

## 풀이 코드

```sql
SELECT PT_NAME, PT_NO, GEND_CD, AGE, IFNULL(TLNO, 'NONE') AS TLNO
FROM PATIENT
WHERE AGE <= 12 AND GEND_CD = 'W'
ORDER BY AGE DESC, PT_NAME ASC
```
