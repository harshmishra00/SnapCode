# Security Policy

This security policy outlines the security support commitments for CodeSnap users. We prioritize the security of our
users and products and are committed to resolving vulnerabilities promptly.

## Security SLAs by User Type

### **Open Source Users (Apache 2.0 License)**

- **Security SLA**: No formal Security Service Level Agreement (SLA) is provided.
- **Release Schedule**: Updates, including security fixes, are released approximately every 3 to 6 months.
- **Version Support**: Security patches are only provided for the latest release version.

### **CodeSnap Pro Users**

- **Security SLA**: Vulnerabilities are addressed based on severity within the following timelines:
    - **Critical**: Resolved within 14 days.
    - **High**: Resolved within 30 days.
    - **Medium**: Resolved within 90 days.
    - **Low**: Resolved within 180 days.
    - **Informational**: Addressed as needed.
- **Release Schedule**: Updates are released promptly after vulnerabilities are resolved, in line with the SLA.
- **Version Support**: Security patches are provided for the latest version and, when applicable, supported versions
  outlined in the Pro user agreement.

---

## Reporting a Vulnerability

We encourage the community to report any potential vulnerabilities to help us keep CodeSnap secure.

### **How to Report**

Submit reports via **[ranitmanik.dev@gmail.com](mailto:ranitmanik.dev@gmail.com)**. For sensitive disclosures, encrypt
your
email using [PGP key](https://pgptool.github.io/).

Provide as much detail as possible, including:

- Affected area of the system.
- Steps to reproduce the vulnerability.
- Proof-of-concept or exploit code (if available).
- Severity and potential impact.

---

### **Guidelines**

When security testing CodeSnap, please avoid:

- Privacy violations or data destruction.
- Service disruption longer than 5 minutes.
- Scanning at a rate exceeding 5 queries per second (QPS).

Focus on reporting vulnerabilities that could lead to real-world exploits.

---

### **Out-of-Scope Vulnerabilities**

- Exploits requiring physical access to devices.
- Vulnerabilities in unsupported versions of browsers or outdated dependencies.
- Configuration issues caused by user error.

**Notes**:

- Vulnerabilities caused by the same root issue are treated as one.
- We may award swag for lower-impact findings.

---

## Response and Timeline

Our commitment to triaging and resolving security reports:

- **Initial Response**: Within 1-2 business days.
- **Triage Completion**: Within 3-5 business days.
- **Resolution Timeline**: Based on the SLA and severity.

We'll maintain clear communication throughout the process.

---

## Safe Harbor

Activities conducted in line with this policy are authorized and protected. If legal concerns arise, we will make it
clear that your actions were compliant with our policy.

Thank you for helping us secure CodeSnap and protect our users!
