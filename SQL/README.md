# SQL 문제 풀이

## 목차

- [SQL 문법 정리](#sql-문법-정리)
- [난이도 별 분류](#난이도-별-분류)
- [유형 별 분류](#유형-별-분류)

## SQL 문법 정리

### 목차

- [데이터 읽어오기](#select-데이터-읽어오기)
- [조건문](#where-조건문)
- [정렬하기](#order-by-정렬하기)
- [문자열 자르기](#substr-substring-left-right-문자열-자르기)
- [날짜 출력하기](#날짜-출력하기)
- [두 개의 테이블에서 데이터 추출하기](#두-개의-테이블에서-데이터-추출하기-join)

### 데이터 읽어오기 (SELECT)

데이터를 읽어오기 위해 SELECT문을 사용합니다. CRUD 중 Read에 해당합니다.

```sql
-- 기본 구조
SELECT 필드이름
FROM 테이블

-- 여러 필드를 조회하는 경우
SELECT 필드이름1, 필드이름2
FROM 테이블

-- 모든 필드를 조회하는 경우
SELECT *
FROM 테이블

-- 중복된 데이터를 없앤 필드를 조회하는 경우
SELECT DISTINCT 필드이름
FROM 테이블
```

### 조건문 (WHERE)

SELECT, UPDATE, DELETE문 등에 특정 레콛에 대해 조건을 사용하기 위해서는 WHERE문을 사용합니다.

```sql
-- 단일 조건식을 적용하는 경우
SELECT 필드이름 혹은 * FROM 테이블
WHERE 필드이름 = 비교값

-- 여러 조건식을 적용하는 경우 AND나 OR을 연결해서 적용할 수 있습니다.
SELECT 필드이름 혹은 * FROM 테이블
WHERE 필드이름1 = 비교값1
AND 필드이름2 = 비교값2
OR 필드이름3 = 비교값3

-- LIKE. 해당 패턴에 해당되는 레코드들을 선별할 때 사용됩니다.
-- 일치하는 것을 찾을 경우 값을 그대로 작성해주고, 특정 문자열로 시작하는
-- 레코드를 선별한 경우 %를 뒤에 붙여 사용합니다.
SELECT 필드이름 혹은 * FROM 테이블
WHERE 필드이름 LIKE 비교값%

-- IN은 해당 컬럼이 어떤 값들의 집합에 속할 경우를 나타냅니다.
SELECT 필드이름 혹은 * FROM 테이블
WHERE 필드이름 IN (값1, 값2, 값3)

-- BETWEEN은 컬럼값이 BETWEEN...AND의 범위값에 든 경우를 나타냅니다.
SELECT 필드이름 혹은 * FROM 테이블
WHERE 필드이름 BETWEEN 값1 AND 값2

-- 컬럼값이 널(NULL)인 경우를 체크하기 위해서는 IS NULL을 사용합니다.
-- 반대의 경우 IS NOT NULL 을 사용합니다.
SELECT 필드이름 혹은 * FROM 테이블
WHERE 필드이름 IS NULL
```

### 정렬하기 (ORDER BY)

데이터를 정렬하기 위해서는 ORDER BY를 사용합니다.

```sql
-- 특정 필드를 기준으로 정렬할 경우
SELECT 필드이름 FROM 테이블
ORDER BY 필드이름

-- 정렬 기준이 여러개인 경우 --> 필드이름 1을 기준으로 정렬하고, 비교값이 같다면 필드이름2를 기준으로 정렬합니다.
SELECT 필드이름 FROM 테이블
ORDER BY 필드이름1, 필드이름2, 필드이름3

-- 내림차순 정렬을 위해서 DESC를 사용
SELECT 필드이름 FROM 테이블
ORDER BY 필드이름1 DESC

-- 오름차순 정렬을 위해서 ASC를 사용
SELECT 필드이름 FROM 테이블
ORDER BY 필드이름1 ASC
```

### 문자열 자르기 (SUBSTR, SUBSTRING, LEFT, RIGHT)

SQL에서 문자열을 자르기 위해 SUBSTR, SUBSTRING, LEFT, RIGHT을 사용할 수 있다.

```sql
-- 기본 데이터
SELECT "string" as email; -- email: string

-- SUBSTR. SUBSTRING. 원하는 문자열을 시작 위치부터 마지막 위치까지 자르기
-- SUBSTR[ING](원하는 문자열, 시작 위치, 길이)
-- 길이를 미 입력시 마지막까지 추출
SELECT SUBSTR("string", 1, 3) as email; -- email: str
SELECT SUBSTRING("string", 1, 3) as email; -- email: str
SELECT SUBSTR("string", 3) as email; -- email: ring

-- LEFT. 원하는 문자열을 왼쪽 첫 번째부터 입력받은 길이만큼 추출하기
SELECT LEFT('string', 3) as email -- email: str

-- RIGHT. 원하는 문자열을 오른쪽 첫 번째부터 입력받은 길이만큼 추출하기
SELECT RIGHT('string', 4) as email -- email: ring
```

### 날짜 출력하기

#### DATE_FORMAT

날짜를 지정한 형식으로 출력하기 위해서 사용합니다.

```sql
-- 기본 문법
DATE_FORMAT(날짜, 형식)
```

| 구분 기호 | 역할             |
| --------- | ---------------- |
| %Y        | 4자리 년도       |
| %y        | 2자리 년도       |
| %M        | 긴 영문 월       |
| %b        | 짧은 영문 월     |
| %W        | 긴 요일 이름     |
| %a        | 짧은 요일 이름   |
| %m        | 숫자 월(두 자리) |
| %c        | 숫자 월(한 자리) |
| %d        | 숫자 일(두 자리) |
| %e        | 숫자 일(한 자리) |
| %H        | 시간(24 시간)    |
| %l        | 시간(12 시간)    |
| %i        | 분               |
| %s        | 초               |
| %T        | hh:mm:ss         |
| %r        | hh:mm:ss AM, PM  |

```sql
SELECT DATE_FORMAT(NOW(),'%Y-%m-%d') AS DATE FROM DUAL -- DATE: 2023-02-09
SELECT DATE_FORMAT(NOW(),'%Y %M %D %T') AS DATE FROM DUAL -- 2023 February 9th 09:25:07
```

#### YEAR, MONTH, DAY, HOUR, MINUTE, SECOND

주어진 날짜로부터 각 단위를 추출하기 위해 사용합니다.

```sql
SELECT YEAR('2023-02-09 09:25:07') -- 2023
SELECT MONTH('2023-02-09 09:25:07') -- 2
SELECT DAY('2023-02-09 09:25:07') -- 9
SELECT HOUR('2023-02-09 09:25:07') -- 9
SELECT MINUTE('2023-02-09 09:25:07') -- 25
SELECT SECOND('2023-02-09 09:25:07') -- 7
```

### 두 개의 테이블에서 데이터 추출하기 (JOIN)

![내부 조인](https://hongong.hanbit.co.kr/wp-content/uploads/2021/11/%ED%98%BC%EC%9E%90-%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94-SQL_INNER-JOIN.png)
[출처: 혼공러들의 스터디 공간]

두 개의 테이블을 엮어야 결과를 얻을 수 있을 때는 JOIN을 사용합니다. 두 테이블의 조인을 위해서는
**기본키와 외래키 관계**로 이루어져 있어야 하며, 이것을 **일대다 관계**라고 합니다.

JOIN은 두 개의 테이블을 서로 묶어서 하나의 결과를 만들어 내는 것입니다. JOIN에는 4가지 종류가 있는데, INNER JOIN, OUTER JOIN, CROSS JOIN, SELF JOIN이 있습니다.

#### INNER JOIN(내부 조인)

기본적인 JOIN을 의미하며 두 테이블을 연결할 때 가장 많이 사용하는 것이 내부 조인입니다. 두 테이블에 모두 지정한 컬럼의 데이터가 있어야 합니다. 교집합을 만드는 것과 비슷합니다.

```sql
SELECT 컬럼 목록
FROM 첫 번째 테이블
  INNER JOIN 두 번째 테이블 -- INNER JOIN을 JOIN이라고 작성해도 같은 역할을 합니다.
  ON 조인될 조건
WHERE 검색 조건
```

#### OUTER JOIN(외부 조인)

![외부 조인](https://hongong.hanbit.co.kr/wp-content/uploads/2021/11/OUTER-JOIN_%EB%8D%94%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0.png)
[출처: 혼공러들의 스터디 공간]

INNER JOIN과 달리 두 테이블에 모두 데이터가 있어야 결과가 나오는 것이 아니라, OUTER JOIN은 한 쪽 테이블에만 데이터가 있어도 결과를 만들어낼 수 있습니다.

- LEFT OUTER JOIN: 왼쪽 테이블의 모든 값이 출력되는 조인 (LEFT)
- RIGHT OUTER JOIN: 오른쪽 테이블의 모든 값이 출력되는 조인 (RIGHT)
- FULL OUTER JOIN: 왼쪽 또는 오른쪽 테이블의 모든 값이 출력되는 조인 (합집합)

```sql
SELECT 컬럼 목록
FROM 첫 번째 테이블(LEFT 테이블)
  <LEFT | RIGHT | FULL> OUTER JOIN 두 번째 테이블(RIGHT 테이블)
  ON 조인될 조건
WHERE 검색 조건
```

#### CROSS JOIN(상호 조인)

![상호 조인](https://hongong.hanbit.co.kr/wp-content/uploads/2021/11/%ED%98%BC%EC%9E%90-%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94-SQL_CROSS-JOIN.png)
[출처: 혼공러들의 스터디 공간]

한쪽 테이블의 모든 행과 다른 쪽 테이블의 모든 행을 조인시키는 기능입니다. 상호 조인 결과의 전체 행의 개수는 두 테이블의 각 행의 개수를 곱한 수 만큽 됩니다. 카티션 곱(CARTESIAN PRODUCT)라고도 합니다.

```sql
SELECT *
FROM 첫 번째 테이블
  CROSS JOIN 두 번째 테이블
```

#### SELF JOIN(자체 조인)

자체 조인은 자기 자신고 조인하므로 1개의 테이블을 사용합니다. 별칭을 이용해 조입합니다.

```sql
SELECT 컬럼 목록
FROM 테이블 별칭 A
  INNER JOIN 테이블 별칭 B
  ON 조인될 조건
WHERE 검색 조건
```

<br />

[⬆ Back to Top](#목차)
<br />

## 난이도 별 분류

### LEVEL 1

- [평균 일일 대여 요금 구하기](./Level1/평균%20일일%20대여%20요금%20구하기/problem.md)
- [인기있는 아이스크림](./Level1/인기있는%20아이스크림/problem.md)
- [과일로 만든 아이스크림 고르기](./Level1/과일로%20만든%20아이스크림%20고르기/problem.md)

### LEVEL 2

- [3월에 태어난 여성 회원 목록 출력하기](./Level2/3월에%20태어난%20여성%20회원%20목록%20출력하기/problem.md)

<br />

[⬆ Back to Top](#목차)
<br />

## 유형 별 분류

### SELECT

- [평균 일일 대여 요금 구하기](./Level1/평균%20일일%20대여%20요금%20구하기/problem.md)
- [인기있는 아이스크림](./Level1/인기있는%20아이스크림/problem.md)
- [3월에 태어난 여성 회원 목록 출력하기](./Level2/3월에%20태어난%20여성%20회원%20목록%20출력하기/problem.md)
- [과일로 만든 아이스크림 고르기](./Level1/과일로%20만든%20아이스크림%20고르기/problem.md)

<br />

[⬆ Back to Top](#목차)
<br />

## 참고

- [혼공러들의 스터디 공간](https://hongong.hanbit.co.kr/sql-%EA%B8%B0%EB%B3%B8-%EB%AC%B8%EB%B2%95-joininner-outer-cross-self-join/)
