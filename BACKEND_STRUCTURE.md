# Backend Structure for Company Data (Spring Boot)

## Entity Models

```java
// Company.java (Parent entity)
@Entity
@Table(name = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private CompanyInfo info;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CoreValue> values = new ArrayList<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CompanyService> services = new ArrayList<>();

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeamDepartment> teamDepartments = new ArrayList<>();
}
```

```java
// CompanyInfo.java
@Entity
@Table(name = "company_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyInfo {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @OneToOne(optional = false)
    @JoinColumn(name = "company_id", nullable = false, unique = true)
    private Company company;

    @Column(nullable = false)
    private String founded;

    @Column(nullable = false)
    private String employees;

    @Column(nullable = false)
    private String headquarters;

    @Column(columnDefinition = "TEXT")
    private String mission;

    @Column(columnDefinition = "TEXT")
    private String vision;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;
}
```

```java
// CoreValue.java
@Entity
@Table(name = "core_values")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreValue {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String icon; // e.g., "Target", "Zap", "Shield", "TrendingUp"

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order")
    private Integer order;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;
}
```

```java
// CompanyService.java (Note: renamed from 'Service' to 'CompanyService' to avoid conflicts)
@Entity
@Table(name = "services")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyService {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    @Column(name = "display_order")
    private Integer order;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;
}
```

```java
// TeamDepartment.java
@Entity
@Table(name = "team_departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamDepartment {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String count;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order")
    private Integer order;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;
}
```

## DTOs (Data Transfer Objects)

```java
// CompanyDataDTO.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDataDTO {
    private CompanyInfoDTO companyInfo;
    private List<CoreValueDTO> values;
    private List<String> services;
    private List<TeamDepartmentDTO> teamSize;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyInfoDTO {
    private String name;
    private String founded;
    private String employees;
    private String headquarters;
    private String mission;
    private String vision;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoreValueDTO {
    private String icon;
    private String title;
    private String description;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeamDepartmentDTO {
    private String role;
    private String count;
    private String description;
}
```

## Repositories

```java
// CompanyRepository.java
@Repository
public interface CompanyRepository extends JpaRepository<Company, UUID> {
    Company findByName(String name);
    List<Company> findAll();
}

// CompanyInfoRepository.java
@Repository
public interface CompanyInfoRepository extends JpaRepository<CompanyInfo, UUID> {
    CompanyInfo findByCompanyId(UUID companyId);
}

// CoreValueRepository.java
@Repository
public interface CoreValueRepository extends JpaRepository<CoreValue, UUID> {
    List<CoreValue> findByCompanyIdOrderByOrderAsc(UUID companyId);
    void deleteByCompanyId(UUID companyId);
}

// CompanyServiceRepository.java
@Repository
public interface CompanyServiceRepository extends JpaRepository<CompanyService, UUID> {
    List<CompanyService> findByCompanyIdOrderByOrderAsc(UUID companyId);
    void deleteByCompanyId(UUID companyId);
}

// TeamDepartmentRepository.java
@Repository
public interface TeamDepartmentRepository extends JpaRepository<TeamDepartment, UUID> {
    List<TeamDepartment> findByCompanyIdOrderByOrderAsc(UUID companyId);
    void deleteByCompanyId(UUID companyId);
}
```

## Services

```java
// CompanyDataService.java
@Service
@Slf4j
public class CompanyDataService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyInfoRepository companyInfoRepository;

    @Autowired
    private CoreValueRepository coreValueRepository;

    @Autowired
    private CompanyServiceRepository serviceRepository;

    @Autowired
    private TeamDepartmentRepository teamDepartmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Get all data for a specific company by UUID
     */
    public CompanyDataDTO getCompanyDataByUUID(UUID companyId) {
        Company company = companyRepository.findById(companyId)
            .orElseThrow(() -> new CompanyNotFoundException("Company not found: " + companyId));

        CompanyInfo info = companyInfoRepository.findByCompanyId(companyId);
        List<CoreValue> values = coreValueRepository.findByCompanyIdOrderByOrderAsc(companyId);
        List<CompanyService> services = serviceRepository.findByCompanyIdOrderByOrderAsc(companyId);
        List<TeamDepartment> teams = teamDepartmentRepository.findByCompanyIdOrderByOrderAsc(companyId);

        return CompanyDataDTO.builder()
            .companyId(companyId)
            .companyInfo(info != null ? modelMapper.map(info, CompanyInfoDTO.class) : null)
            .values(values.stream()
                .map(v -> modelMapper.map(v, CoreValueDTO.class))
                .collect(Collectors.toList()))
            .services(services.stream()
                .map(CompanyService::getTitle)
                .collect(Collectors.toList()))
            .teamSize(teams.stream()
                .map(t -> modelMapper.map(t, TeamDepartmentDTO.class))
                .collect(Collectors.toList()))
            .build();
    }

    /**
     * Get company by ID
     */
    public Company getCompanyById(UUID companyId) {
        return companyRepository.findById(companyId)
            .orElseThrow(() -> new CompanyNotFoundException("Company not found: " + companyId));
    }

    /**
     * Create a new company
     */
    public Company createCompany(String name, String description) {
        Company company = new Company();
        company.setName(name);
        company.setDescription(description);
        company.setCreatedAt(LocalDateTime.now());
        company.setUpdatedAt(LocalDateTime.now());
        return companyRepository.save(company);
    }

    /**
     * Update company information
     */
    public CompanyInfoDTO updateCompanyInfo(UUID companyId, CompanyInfoDTO dto) {
        CompanyInfo info = companyInfoRepository.findByCompanyId(companyId);

        if (info == null) {
            // Create new CompanyInfo if doesn't exist
            Company company = getCompanyById(companyId);
            info = new CompanyInfo();
            info.setCompany(company);
        }

        info.setFounded(dto.getFounded());
        info.setEmployees(dto.getEmployees());
        info.setHeadquarters(dto.getHeadquarters());
        info.setMission(dto.getMission());
        info.setVision(dto.getVision());
        info.setUpdatedAt(LocalDateTime.now());

        CompanyInfo saved = companyInfoRepository.save(info);
        return modelMapper.map(saved, CompanyInfoDTO.class);
    }

    /**
     * Add core value to company
     */
    public CoreValueDTO addCoreValue(UUID companyId, CoreValueDTO dto) {
        Company company = getCompanyById(companyId);

        CoreValue value = modelMapper.map(dto, CoreValue.class);
        value.setCompany(company);
        value.setCreatedAt(LocalDateTime.now());

        CoreValue saved = coreValueRepository.save(value);
        return modelMapper.map(saved, CoreValueDTO.class);
    }

    /**
     * Delete core value
     */
    public void deleteCoreValue(UUID companyId, UUID valueId) {
        CoreValue value = coreValueRepository.findById(valueId)
            .orElseThrow(() -> new ResourceNotFoundException("Core value not found: " + valueId));

        if (!value.getCompany().getId().equals(companyId)) {
            throw new UnauthorizedException("Core value does not belong to this company");
        }

        coreValueRepository.deleteById(valueId);
    }

    /**
     * Add service to company
     */
    public CompanyService addService(UUID companyId, String title) {
        Company company = getCompanyById(companyId);

        CompanyService service = new CompanyService();
        service.setCompany(company);
        service.setTitle(title);
        service.setCreatedAt(LocalDateTime.now());

        return serviceRepository.save(service);
    }

    /**
     * Delete service
     */
    public void deleteService(UUID companyId, UUID serviceId) {
        CompanyService service = serviceRepository.findById(serviceId)
            .orElseThrow(() -> new ResourceNotFoundException("Service not found: " + serviceId));

        if (!service.getCompany().getId().equals(companyId)) {
            throw new UnauthorizedException("Service does not belong to this company");
        }

        serviceRepository.deleteById(serviceId);
    }

    /**
     * Add team department to company
     */
    public TeamDepartmentDTO addTeamDepartment(UUID companyId, TeamDepartmentDTO dto) {
        Company company = getCompanyById(companyId);

        TeamDepartment dept = modelMapper.map(dto, TeamDepartment.class);
        dept.setCompany(company);
        dept.setCreatedAt(LocalDateTime.now());

        TeamDepartment saved = teamDepartmentRepository.save(dept);
        return modelMapper.map(saved, TeamDepartmentDTO.class);
    }

    /**
     * Delete team department
     */
    public void deleteTeamDepartment(UUID companyId, UUID deptId) {
        TeamDepartment dept = teamDepartmentRepository.findById(deptId)
            .orElseThrow(() -> new ResourceNotFoundException("Team department not found: " + deptId));

        if (!dept.getCompany().getId().equals(companyId)) {
            throw new UnauthorizedException("Team department does not belong to this company");
        }

        teamDepartmentRepository.deleteById(deptId);
    }
}
```

```java
// Custom Exceptions
@ResponseStatus(HttpStatus.NOT_FOUND)
public class CompanyNotFoundException extends RuntimeException {
    public CompanyNotFoundException(String message) {
        super(message);
    }
}

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
```

## Controllers

```java
// CompanyDataController.java
@RestController
@RequestMapping("/api/companies")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class CompanyDataController {

    @Autowired
    private CompanyDataService companyDataService;

    /**
     * GET /api/companies/{companyId}/data
     * Returns all company information for a specific company
     */
    @GetMapping("/{companyId}/data")
    public ResponseEntity<CompanyDataDTO> getCompanyData(@PathVariable UUID companyId) {
        try {
            CompanyDataDTO data = companyDataService.getCompanyDataByUUID(companyId);
            return ResponseEntity.ok(data);
        } catch (CompanyNotFoundException e) {
            log.error("Company not found: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error fetching company data for company: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/companies/{companyId}
     * Get company details
     */
    @GetMapping("/{companyId}")
    public ResponseEntity<Company> getCompany(@PathVariable UUID companyId) {
        try {
            Company company = companyDataService.getCompanyById(companyId);
            return ResponseEntity.ok(company);
        } catch (CompanyNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * POST /api/companies
     * Create a new company
     */
    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestParam String name,
                                                  @RequestParam(required = false) String description) {
        try {
            Company company = companyDataService.createCompany(name, description);
            return ResponseEntity.status(HttpStatus.CREATED).body(company);
        } catch (Exception e) {
            log.error("Error creating company", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT /api/companies/{companyId}/info
     * Update company information
     */
    @PutMapping("/{companyId}/info")
    public ResponseEntity<CompanyInfoDTO> updateCompanyInfo(@PathVariable UUID companyId,
                                                            @RequestBody CompanyInfoDTO dto) {
        try {
            CompanyInfoDTO updated = companyDataService.updateCompanyInfo(companyId, dto);
            return ResponseEntity.ok(updated);
        } catch (CompanyNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error updating company info for company: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST /api/companies/{companyId}/values
     * Add a new core value to company
     */
    @PostMapping("/{companyId}/values")
    public ResponseEntity<CoreValueDTO> addCoreValue(@PathVariable UUID companyId,
                                                     @RequestBody CoreValueDTO dto) {
        try {
            CoreValueDTO created = companyDataService.addCoreValue(companyId, dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (CompanyNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error creating core value for company: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /api/companies/{companyId}/values/{valueId}
     * Delete a core value
     */
    @DeleteMapping("/{companyId}/values/{valueId}")
    public ResponseEntity<Void> deleteCoreValue(@PathVariable UUID companyId,
                                               @PathVariable UUID valueId) {
        try {
            companyDataService.deleteCoreValue(companyId, valueId);
            return ResponseEntity.noContent().build();
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error deleting core value for company: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST /api/companies/{companyId}/services
     * Add a new service
     */
    @PostMapping("/{companyId}/services")
    public ResponseEntity<CompanyService> addService(@PathVariable UUID companyId,
                                                     @RequestBody String title) {
        try {
            CompanyService created = companyDataService.addService(companyId, title);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (CompanyNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error creating service for company: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /api/companies/{companyId}/services/{serviceId}
     * Delete a service
     */
    @DeleteMapping("/{companyId}/services/{serviceId}")
    public ResponseEntity<Void> deleteService(@PathVariable UUID companyId,
                                             @PathVariable UUID serviceId) {
        try {
            companyDataService.deleteService(companyId, serviceId);
            return ResponseEntity.noContent().build();
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error deleting service for company: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST /api/companies/{companyId}/team
     * Add a new team department
     */
    @PostMapping("/{companyId}/team")
    public ResponseEntity<TeamDepartmentDTO> addTeamDepartment(@PathVariable UUID companyId,
                                                               @RequestBody TeamDepartmentDTO dto) {
        try {
            TeamDepartmentDTO created = companyDataService.addTeamDepartment(companyId, dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (CompanyNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error creating team department for company: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /api/companies/{companyId}/team/{deptId}
     * Delete a team department
     */
    @DeleteMapping("/{companyId}/team/{deptId}")
    public ResponseEntity<Void> deleteTeamDepartment(@PathVariable UUID companyId,
                                                     @PathVariable UUID deptId) {
        try {
            companyDataService.deleteTeamDepartment(companyId, deptId);
            return ResponseEntity.noContent().build();
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error deleting team department for company: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
```

## Application Properties

```properties
# application.properties or application.yml

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/transport_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Logging
logging.level.root=INFO
logging.level.com.yourcompany=DEBUG

# CORS
server.servlet.context-path=/api
```

## How to Integrate with Frontend

Update `app/dashboard/actions.ts`:

```typescript
export async function getCompanyData(companyId: string): Promise<CompanyData> {
  try {
    // companyId will be a UUID string like "550e8400-e29b-41d4-a716-446655440000"
    const response = await fetch(
      `http://your-backend-url:8080/api/companies/${companyId}/data`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch company data:", error);
    // Return mock data as fallback
    return getMockCompanyData();
  }
}
```

Update `app/dashboard/page.tsx` to accept company ID:

```typescript
async function DashboardPage({ params }: { params: { companyId: string } }) {
  const data = await getCompanyData(params.companyId);
  // ... rest of component
}
```

Or use a query parameter:

```typescript
async function DashboardPage({
  searchParams,
}: {
  searchParams: { companyId: string };
}) {
  const data = await getCompanyData(searchParams.companyId);
  // ... rest of component
}
```

## Database Schema (SQL)

```sql
CREATE TABLE companies (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company_id CHAR(36) NOT NULL,
  role ENUM('ADMIN', 'MANAGER', 'USER') NOT NULL DEFAULT 'USER',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_email (email),
  INDEX idx_company_id (company_id)
);

CREATE TABLE refresh_tokens (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  token TEXT NOT NULL UNIQUE,
  revoked BOOLEAN NOT NULL DEFAULT FALSE,
  expires_at TIMESTAMP,
  created_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

CREATE TABLE company_info (
  id CHAR(36) PRIMARY KEY,
  company_id CHAR(36) NOT NULL UNIQUE,
  founded VARCHAR(50),
  employees VARCHAR(50),
  headquarters VARCHAR(255),
  mission TEXT,
  vision TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);

CREATE TABLE core_values (
  id CHAR(36) PRIMARY KEY,
  company_id CHAR(36) NOT NULL,
  icon VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INT,
  created_at TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_company_id (company_id)
);

CREATE TABLE services (
  id CHAR(36) PRIMARY KEY,
  company_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  display_order INT,
  created_at TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_company_id (company_id)
);

CREATE TABLE team_departments (
  id CHAR(36) PRIMARY KEY,
  company_id CHAR(36) NOT NULL,
  role VARCHAR(255) NOT NULL,
  count VARCHAR(50),
  description TEXT,
  display_order INT,
  created_at TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_company_id (company_id)
);
```

## User & Company Relationship Entities

```java
// User.java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password; // BCrypt encoded

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @ManyToOne(optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role; // ADMIN, MANAGER, USER

    @Column(nullable = false)
    private Boolean active = true;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RefreshToken> refreshTokens = new ArrayList<>();
}

// UserRole.java
public enum UserRole {
    ADMIN,      // Full access to company
    MANAGER,    // Can edit company info, values, services, team
    USER        // Read-only access
}
```

```java
// RefreshToken.java
@Entity
@Table(name = "refresh_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Boolean revoked = false;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime expiresAt;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;
}
```

## JWT & Security Configuration

```java
// JwtProperties.java
@Configuration
@ConfigurationProperties(prefix = "jwt")
@Data
public class JwtProperties {
    private String secretKey;
    private Long expirationMs;
    private Long refreshExpirationMs;
}
```

```java
// JwtTokenProvider.java
@Service
@Slf4j
public class JwtTokenProvider {

    @Autowired
    private JwtProperties jwtProperties;

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());
        claims.put("role", user.getRole().toString());
        claims.put("companyId", user.getCompany().getId().toString());

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(user.getId().toString())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpirationMs()))
            .signWith(getSigningKey(), SignatureAlgorithm.HS512)
            .compact();
    }

    public String generateRefreshToken(User user) {
        return Jwts.builder()
            .setSubject(user.getId().toString())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getRefreshExpirationMs()))
            .signWith(getSigningKey(), SignatureAlgorithm.HS512)
            .compact();
    }

    public String getEmailFromToken(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            return (String) claims.get("email");
        } catch (Exception e) {
            log.error("Error extracting email from token", e);
            return null;
        }
    }

    public String getUserIdFromToken(String token) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        } catch (Exception e) {
            log.error("Error extracting user ID from token", e);
            return null;
        }
    }

    public String getCompanyIdFromToken(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            return (String) claims.get("companyId");
        } catch (Exception e) {
            log.error("Error extracting company ID from token", e);
            return null;
        }
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.warn("JWT token is expired");
            return false;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Invalid JWT token");
            return false;
        }
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecretKey());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
```

```java
// JwtAuthenticationFilter.java
@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = extractTokenFromRequest(request);

            if (token != null && jwtTokenProvider.isTokenValid(token)) {
                String userId = jwtTokenProvider.getUserIdFromToken(token);
                String email = jwtTokenProvider.getEmailFromToken(token);
                String companyId = jwtTokenProvider.getCompanyIdFromToken(token);

                // Optional: Verify user still exists in DB
                User user = userRepository.findById(UUID.fromString(userId)).orElse(null);

                if (user != null && user.getActive()) {
                    UserPrincipal userPrincipal = new UserPrincipal(user);
                    UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                            userPrincipal,
                            null,
                            userPrincipal.getAuthorities()
                        );

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception e) {
            log.error("Cannot set user authentication", e);
        }

        filterChain.doFilter(request, response);
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
```

```java
// UserPrincipal.java
@Data
public class UserPrincipal implements UserDetails {
    private UUID id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private UUID companyId;
    private UserRole role;
    private Boolean active;
    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.companyId = user.getCompany().getId();
        this.role = user.getRole();
        this.active = user.getActive();
        this.authorities = Collections.singletonList(
            new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return active;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return active;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
```

## Updated Repositories

```java
// UserRepository.java
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    List<User> findByCompanyId(UUID companyId);
}

// RefreshTokenRepository.java
@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUserId(UUID userId);
}
```

## Updated Company Service

```java
// CompanyDataService.java - Updated getCompanyDataByUUID method
@Service
@Slf4j
public class CompanyDataService {
    // ... existing code ...

    /**
     * Get company data for authenticated user
     * Extracts email from JWT and looks up company ID
     */
    public CompanyDataDTO getCompanyDataForAuthenticatedUser() {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        if (currentUser == null) {
            throw new UnauthorizedException("User not authenticated");
        }

        UUID companyId = currentUser.getCompanyId();
        return getCompanyDataByUUID(companyId);
    }

    /**
     * Get company data by UUID (original method, kept for admin use)
     */
    public CompanyDataDTO getCompanyDataByUUID(UUID companyId) {
        Company company = companyRepository.findById(companyId)
            .orElseThrow(() -> new CompanyNotFoundException("Company not found: " + companyId));

        CompanyInfo info = companyInfoRepository.findByCompanyId(companyId);
        List<CoreValue> values = coreValueRepository.findByCompanyIdOrderByOrderAsc(companyId);
        List<CompanyService> services = serviceRepository.findByCompanyIdOrderByOrderAsc(companyId);
        List<TeamDepartment> teams = teamDepartmentRepository.findByCompanyIdOrderByOrderAsc(companyId);

        return CompanyDataDTO.builder()
            .companyId(companyId)
            .companyInfo(info != null ? modelMapper.map(info, CompanyInfoDTO.class) : null)
            .values(values.stream()
                .map(v -> modelMapper.map(v, CoreValueDTO.class))
                .collect(Collectors.toList()))
            .services(services.stream()
                .map(CompanyService::getTitle)
                .collect(Collectors.toList()))
            .teamSize(teams.stream()
                .map(t -> modelMapper.map(t, TeamDepartmentDTO.class))
                .collect(Collectors.toList()))
            .build();
    }

    /**
     * Verify company access for user (security check)
     */
    public void verifyCompanyAccess(UUID companyId) {
        UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        if (!currentUser.getCompanyId().equals(companyId)) {
            throw new UnauthorizedException("Access denied to this company");
        }
    }
}
```

## Updated Controllers

```java
// CompanyDataController.java - Updated endpoints
@RestController
@RequestMapping("/api/companies")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class CompanyDataController {

    @Autowired
    private CompanyDataService companyDataService;

    /**
     * GET /api/companies/me/data
     * Returns company data for authenticated user (extracts company ID from JWT)
     * No company ID needed in URL - derived from user's company association
     */
    @GetMapping("/me/data")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CompanyDataDTO> getMyCompanyData() {
        try {
            CompanyDataDTO data = companyDataService.getCompanyDataForAuthenticatedUser();
            return ResponseEntity.ok(data);
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            log.error("Error fetching company data", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/companies/{companyId}/data
     * Returns company data for specific company (admin only)
     */
    @GetMapping("/{companyId}/data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CompanyDataDTO> getCompanyData(@PathVariable UUID companyId) {
        try {
            CompanyDataDTO data = companyDataService.getCompanyDataByUUID(companyId);
            return ResponseEntity.ok(data);
        } catch (CompanyNotFoundException e) {
            log.error("Company not found: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error fetching company data for company: {}", companyId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT /api/companies/me/info
     * Update company info for authenticated user's company
     */
    @PutMapping("/me/info")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<CompanyInfoDTO> updateMyCompanyInfo(@RequestBody CompanyInfoDTO dto) {
        try {
            UserPrincipal currentUser = (UserPrincipal) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

            CompanyInfoDTO updated = companyDataService.updateCompanyInfo(currentUser.getCompanyId(), dto);
            return ResponseEntity.ok(updated);
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (Exception e) {
            log.error("Error updating company info", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Similar pattern for other endpoints...
    // PUT /api/companies/me/info
    // POST /api/companies/me/values
    // DELETE /api/companies/me/values/{valueId}
    // POST /api/companies/me/services
    // DELETE /api/companies/me/services/{serviceId}
    // POST /api/companies/me/team
    // DELETE /api/companies/me/team/{deptId}
}
```

## Authentication Controller

```java
// AuthController.java
@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * POST /api/auth/login
     * Login with email and password
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

            if (!user.getActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("User account is disabled"));
            }

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Invalid credentials"));
            }

            String accessToken = jwtTokenProvider.generateToken(user);
            String refreshToken = jwtTokenProvider.generateRefreshToken(user);

            return ResponseEntity.ok(new AuthResponse(
                accessToken,
                refreshToken,
                "Bearer",
                user.getId().toString(),
                user.getEmail(),
                user.getCompany().getId().toString()
            ));
        } catch (Exception e) {
            log.error("Login error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("Login failed"));
        }
    }

    /**
     * POST /api/auth/refresh
     * Refresh access token using refresh token
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshTokenRequest request) {
        try {
            String userId = jwtTokenProvider.getUserIdFromToken(request.getRefreshToken());
            User user = userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));

            if (!user.getActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("User account is disabled"));
            }

            String newAccessToken = jwtTokenProvider.generateToken(user);

            return ResponseEntity.ok(new AuthResponse(
                newAccessToken,
                request.getRefreshToken(),
                "Bearer",
                user.getId().toString(),
                user.getEmail(),
                user.getCompany().getId().toString()
            ));
        } catch (Exception e) {
            log.error("Token refresh error", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse("Token refresh failed"));
        }
    }
}

// DTOs for Auth
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenRequest {
    private String refreshToken;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private String userId;
    private String email;
    private String companyId;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
    private String message;
}
```

## Spring Security Configuration

```java
// SecurityConfig.java
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .exceptionHandling()
            .authenticationEntryPoint((request, response, authException) -> {
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{ \"message\": \"Unauthorized\" }");
            })
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/api/auth/**").permitAll()
            .antMatchers("/api/companies/me/**").authenticated()
            .antMatchers("/api/companies/**").hasRole("ADMIN")
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
```

## pom.xml Dependencies

```xml
<dependencies>
    <!-- Spring Boot Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Boot Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Spring Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

    <!-- JWT (jjwt) -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.3</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.12.3</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.12.3</version>
        <scope>runtime</scope>
    </dependency>

    <!-- MySQL Connector -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.0.33</version>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- ModelMapper -->
    <dependency>
        <groupId>org.modelmapper</groupId>
        <artifactId>modelmapper</artifactId>
        <version>3.1.1</version>
    </dependency>

    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
</dependencies>
```

## application.properties

```properties
# JWT Configuration
jwt.secretKey=your-secret-key-base64-encoded-minimum-256-bits-long
jwt.expirationMs=3600000
jwt.refreshExpirationMs=604800000

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/transport_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Logging
logging.level.root=INFO
logging.level.com.yourcompany=DEBUG

# Server
server.servlet.context-path=/api
server.port=8080
```

## API Flow with JWT & Company ID Extraction

### 1. User Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@acme.com",
  "password": "password123"
}

# Response
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@acme.com",
  "companyId": "660e8400-e29b-41d4-a716-446655440001"
}
```

### 2. Request Company Data with JWT

```bash
GET /api/companies/me/data
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...

# Behind the scenes:
# 1. JwtAuthenticationFilter extracts token from Authorization header
# 2. JwtTokenProvider.getEmailFromToken() extracts: "john@acme.com"
# 3. UserRepository.findByEmail() gets User from database
# 4. User.getCompanyId() = "660e8400-e29b-41d4-a716-446655440001"
# 5. CompanyDataService.getCompanyDataByUUID(companyId) returns all data
# 6. User automatically gets their company's data without passing ID in URL

# Response
{
  "companyId": "660e8400-e29b-41d4-a716-446655440001",
  "companyInfo": { ... },
  "values": [ ... ],
  "services": [ ... ],
  "teamSize": [ ... ]
}
```

### 3. Update Company Data (Manager/Admin only)

```bash
PUT /api/companies/me/info
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
Content-Type: application/json

{
  "founded": "2020",
  "employees": "500+",
  "headquarters": "New York",
  "mission": "Our mission...",
  "vision": "Our vision..."
}
```

## Key Security Features

✅ **Email Extraction from JWT**: No need to pass company ID in URL
✅ **User Verification**: Each request checks if user still exists and is active in DB
✅ **Company Isolation**: Users can only access their own company's data
✅ **Role-Based Access Control**: ADMIN, MANAGER, USER roles with different permissions
✅ **Token Expiration**: Short-lived access tokens + refresh token strategy
✅ **Password Security**: BCrypt hashing for all passwords

## Frontend Integration

```typescript
// app/dashboard/actions.ts
export async function getCompanyData(
  accessToken: string
): Promise<CompanyData> {
  try {
    // No company ID needed - extracted from JWT on backend
    const response = await fetch(
      "http://your-backend-url:8080/api/companies/me/data",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch company data:", error);
    return getMockCompanyData();
  }
}
```

## Permission Matrix

| Endpoint                             | Anonymous | USER | MANAGER | ADMIN |
| ------------------------------------ | --------- | ---- | ------- | ----- |
| POST /api/auth/login                 | ✅        | -    | -       | -     |
| POST /api/auth/refresh               | ✅        | -    | -       | -     |
| GET /api/companies/me/data           | -         | ✅   | ✅      | ✅    |
| PUT /api/companies/me/info           | -         | ❌   | ✅      | ✅    |
| POST /api/companies/me/values        | -         | ❌   | ✅      | ✅    |
| DELETE /api/companies/me/values/{id} | -         | ❌   | ✅      | ✅    |
| GET /api/companies/{id}/data         | -         | ❌   | ❌      | ✅    |
| PUT /api/companies/{id}/info         | -         | ❌   | ❌      | ✅    |
