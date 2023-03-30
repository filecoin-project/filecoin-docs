---
title: "General Data Protection Regulation"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-videos"
    identifier: "gdpr-f97fcc55e5c82829cdf164ba4af1a5be"
weight: 100
toc: true
---

Angelo Schalley (CEO) with Linix presents on General Data Protection Regulation (GDPR) and Data Ingestion at the Enterprise Storage Provider Accelerator (ESPA) bootcamp week that took place in April 2022.

{{< youtube "Plt6YbRZoIE" >}}

### GDPR Myths

There are two big myths around GDPR. 

1. It is only a legal and IT problem
2. Only the EU

When a developer starts writing code for any application, for any industry, they need to take in mind that their application needs to conform to the GDPR. If anyone from the EU uses that application, then GDPR takes effect. 

And the GDPR is not just for Europe. If you are working with a company in the EU and there is some form of data transfer, you are now a third party processor and will be held accountable against the GDPR regulation. 

This is important to storage providers as customers in Europe may be storing copies of their data on your storage. If you are participating in Fil+, you need to get four copies of the data stored, some of that may be in the EU. 

Administrative fines for violating the GDPR is 4% of annual revenue up to twenty million dollars. The EU will go after you for that amount of money, even if you are in the US.

### GDPR Outlined

There needs to be a lawful reason for you to store personal data. You cannot just store someone’s personal data in a spreadsheet because you happen to have access to that data somewhere. You need to be transparent and know what you are doing with that data. 

- Lawful basis and transparency
    - Audit
    - Justification
    - Info about data processing

There needs to be data security around the data you are going to process. If you are working with personal data, you need to take security into account. Developers may not take regulation into account right away. You need to make sure that in the end, all code produces a GDPR product. 

- Data security
    - Always encrypt, pseudonymize, and anonymize
    - Internal awareness
    - Data breach

There are three pillars for GDPR security; encryption, pseudonymize, and anonymize. Your developers, legal, and IT need to understand this as a matter of policy within the company. If you ever get an audit from Europe, they will take into account your policies. 

GDRP compliance is all about showing your work, that you care, and that you are working to be as compliant as possible. 

- Accountability and governance
    - Designate someone
    - Processing agreement
    - DPO

Your company will need to assign a DPO, which is a Data Protection Officer. You can assign anyone within your company as long as they have something to do with processing of data. All you need to do if put their information on your website with some basic contact information. Someone may need to contact your company about GDPR or regulation, so having a contact person is very important. 

- Privacy rights
    - Request and receive all info
    - Correct and update
    - Delete on request
    - Access copy
    - Object
    - Automation and protection

Once you start processing personal data, you are now subject to the personal rights of the client. It is their right to request changes, deletions, and access to their information. They can also ask you to stop processing their data, which means your automation and backups need to be cleaned of their data as well. 

### GDPR and Filecoin

We have compiled a list of things you can do within Filecoin to stay GDPR. This is not a complete list, but a starting point. 

**Take data protection into account at all times**

- Immutable
- Meticulously Traceable
- Highly Secure

**Encrypt, pseudonymize, or anonymize personal data wherever possible.**

- Encrypt
- Pseudonymization
- Anonymization

**3rd party processing**

- Be transparent

**Appoint a DPO**

- Be open on how you communicate privacy policies

The immutability of data on Filecoin means the data will not change. If you ever speak to an auditor, you can let them know you store personal data in a way that it can never be messed with. You can also show a complete trace of that data without question. You can prove it didn’t change and that at a certain point it will expire. 

Encryption is something you need address yourself. At this point, Filecoin does not encrypt your data. Keep in mind that we are talking about personal data, not all the data. Data processing for GDPR requires encryption for personal data, not all the data in a given set. 

That said, if you are engaged with a business and you are not sure what the data contains; you need to encrypt it before you put it on the network. 

Pseudonymization is part of the sealing process. Since we put multiple deals into multiple sectors, you as an outsiders cannot know which parts of the sector are for which customer. 

When you are storing data for something like a European storage provider as a replica, be very transparent with your customers about where their data is being stored. 

### Five steps to GDPR compliance

1. Access
    1. Make sure you know how to access the data you collect.
2. Identify
    1. Understand where that data is, where it came from, and how it moves. 
3. Govern
    1. Maintain internal documentation for everyone so that the rules, guidelines, and expectations are known.
4. Protect
    1. Encrypt
    2. Pseudonymization
    3. Anonymization
5. Audit
    1. Keep your documentation and team up to date and run internal audits.
