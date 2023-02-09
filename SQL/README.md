# SQL 문제 풀이

## 목차

- [SQL 문법 정리](#sql-문법-정리)
- [난이도 별 분류](#난이도-별-분류)
- [유형 별 분류](#유형-별-분류)

## SQL 문법 정리

### SELECT (데이터 읽어오기)

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

### WHERE (조건문)

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

### ORDER BY (정렬하기)

데이터를 정렬하기 위해서는 ORDER BY를 사용합니다.

```sql
-- 특정 필드를 기준으로 정렬할 경우
SELECT 필드이름 FROM 테이블
ORDER BY 필드이름

-- 정렬 기준이 여러개인 경우
SELECT 필드이름 FROM 테이블
ORDER BY 필드이름1, 필드이름2, 필드이름3

-- 내림차순 정렬을 위해서 DESC를 사용
SELECT 필드이름 FROM 테이블
ORDER BY 필드이름1 DESC

-- 오름차순 정렬을 위해서 ASC를 사용
SELECT 필드이름 FROM 테이블
ORDER BY 필드이름1 ASC
```

<br />

[⬆ Back to Top](#목차)
<br />

## 난이도 별 분류

### LEVEL 1

- [평균 일일 대여 요금 구하기](./Level1/평균%20일일%20대여%20요금%20구하기/problem.md)

<br />

[⬆ Back to Top](#목차)
<br />

## 유형 별 분류

### SELECT

<br />

[⬆ Back to Top](#목차)
<br />
