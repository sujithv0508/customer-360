import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserRound, Phone, MapPin, ShieldCheck, BriefcaseBusiness, Building2, ChevronUp, ChevronDown } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { sectionVariants, buttonTap } from '../utils/animations';

function Field({ label, value }) {
  return (
    <div className="infoField">
      <span className="infoLabel">{label}</span>
      <span className="infoValue">{value ?? '-'}</span>
    </div>
  );
}

function AddressesSection({ addresses }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? addresses : addresses.slice(0, 1);

  return (
    <motion.div
      className="sectionCard addressCard"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="addressHeader">
        <span className="addressHeaderTitle">
          <MapPin aria-hidden="true" />
          Addresses ({addresses.length})
        </span>
        {addresses.length > 1 && (
          <motion.button
            type="button"
            className="btn btnGhost btnSm"
            onClick={() => setExpanded((e) => !e)}
            {...buttonTap}
          >
            {expanded ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
            {expanded ? 'Hide' : 'View All'}
          </motion.button>
        )}
      </div>

      {visible.map((addr, i) => (
        <div key={i} className="addressBlock">
          <span className="addressLabel">Address {i + 1}</span>
          <div className="infoGrid">
            <Field label="Address Line 1" value={addr.line1} />
            <Field label="Address Line 2" value={addr.line2} />
            <Field label="District/State" value={addr.state} />
            <Field label="City" value={addr.city} />
            <Field label="Country" value={addr.country} />
            <Field label="Postal Code" value={addr.postalCode} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function Section({ icon: Icon, title, subtitle, compact, wide, children }) {
  return (
    <motion.div
      className={`sectionCard${compact ? ' sectionCardCompact' : ''}${wide ? ' sectionCardWide' : ''}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="sectionHeader">
        <span className="sectionIcon"><Icon aria-hidden="true" /></span>
        <div>
          <h2 className="sectionTitle">{title}</h2>
          {subtitle && <p className="sectionSubtitle">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export default function CustomerInfo({ customer }) {
  return (
    <div className="tabContent">
      <Section icon={UserRound} title="Basic Information" compact wide>
        <div className="infoGrid">
          <Field label="Customer Number" value={customer.customerNumber} />
          <Field label="Full Name" value={customer.name} />
          <Field label="Date of Birth" value={customer.dob} />
          <Field label="Gender" value={customer.gender} />
          <Field label="Customer Type" value={customer.customerType} />
          <Field label="Customer Category" value={customer.customerCategory} />
        </div>
      </Section>

      <AddressesSection addresses={customer.addresses} />

      <div className="sectionRow">
        <Section icon={Phone} title="Contact Information" compact>
          <div className="infoGrid">
            <Field label="Phone" value={customer.phone} />
            <Field label="Alternate Phone" value={customer.alternatePhone} />
            <Field label="Email" value={customer.email} />
          </div>
        </Section>

        <Section icon={ShieldCheck} title="Tax & Compliance" compact>
          <div className="infoGrid">
            <Field label="Tax Number (NIF)" value={customer.taxNumber} />
            <Field label="Tax Country" value={customer.taxCountry} />
            <Field label="KYC Status" value={customer.kycStatus} />
            <Field label="Risk Rating" value={customer.riskRating} />
          </div>
        </Section>
      </div>

      <div className="sectionRow">
        <Section icon={BriefcaseBusiness} title="Employment" compact>
          <div className="infoGrid infoGridThree">
            <Field label="Occupation" value={customer.occupation} />
            <Field label="Employer" value={customer.employer} />
            <Field label="Annual Income" value={formatCurrency(customer.annualIncome)} />
          </div>
        </Section>

        <Section icon={Building2} title="Branch Information" compact>
          <div className="infoGrid">
            <Field label="Branch ID" value={customer.branchId} />
            <Field label="Branch Name" value={customer.branchName} />
          </div>
        </Section>
      </div>
    </div>
  );
}
