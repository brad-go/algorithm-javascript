# 3월에 태어난 여성 회원 목록 출력하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/131120

## 문제 분류

: SELECT

## 풀이 과정

날짜 포맷을 연-월-일로만 나타내기 위해 DATE_FORMAT()을 사용했고, 날짜에서 3월이 포함된 생일을 골라내기 위해 MONTH()를 사용했다.

1. MEMBER_PROFILE 테이블에서 회원 ID, 이름, 성별, 생년월일을 선택하기
2. DATE_FORMAT() 사용해서 생년 월일을 지정된 포맷에 맞게 변경해주기
3. MONTH()를 사용해서 3월이 생일인 회원을 골라내기
4. 성별이 여자이고, 전화번호가 NULL이 아닌 회원을 골라내기
5. 회원 ID를 기준으로 오름차순 정렬하기

## 풀이 코드

```sql
SELECT MEMBER_ID, MEMBER_NAME, GENDER, DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d') AS DATE_OF_BIRTH
FROM MEMBER_PROFILE
WHERE MONTH(DATE_OF_BIRTH) = 3 AND GENDER = 'W' AND TLNO IS NOT NULL
ORDER BY MEMBER_ID ASC;
```
