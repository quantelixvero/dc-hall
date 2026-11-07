# 🔐 মডিউল ১: সিকিউরিটি, অথেনটিকেশন ও ডাটা সুরক্ষা (Security & Auth)

> **ফাইলের অবস্থান:** `dc-hall/docs/01_SECURITY_AND_AUTH.md`  
> **সর্বশেষ আপডেট:** ৮ নভেম্বর, ২০২৬  
> **স্ট্যাটাস:** 🔴 অতি জরুরি সংশোধন প্রয়োজন

---

## 🔍 বর্তমান সিকিউরিটি অডিট ও সমস্যাসমূহ (Critical Vulnerabilities)

### ১. Google Cloud Service Account প্রাইভেট কি রুট ফোল্ডারে উন্মুক্ত
- **ফাইল:** [`dc-hall/service_account.json`](file:///c:/Users/USER/Downloads/%23%23aicode/DC-hall%20(sanity)/dc-hall/service_account.json)
- **সমস্যা:** এটিতে `dchall-bot@typing-494006.iam.gserviceaccount.com`-এর সম্পূর্ণ RSA প্রাইভেট কি রয়েছে।
- **ঝুঁকি:** `netlify.toml`-এ `publish = "."` থাকার কারণে যে কেউ `dchall.pro.bd/service_account.json` ইউআরএল দিয়ে সরাসরি প্রাইভেট কি ডাউনলোড করে নিতে পারবে।
- **সমাধান:** ফাইলটিকে অবিলম্বে রুট ডিরেক্টরি থেকে সরিয়ে `private_credentials/` অথবা সার্ভার এনভায়রনমেন্ট ভেরিয়েবলে রূপান্তর করা।

### ২. ক্লায়েন্ট-সাইড জাভাস্ক্রিপ্টে হার্ডকোডেড পাসওয়ার্ড
- **ফাইল:** [`dc-hall/js/app.js`](file:///c:/Users/USER/Downloads/%23%23aicode/DC-hall%20(sanity)/dc-hall/js/app.js#L5608-L5646)
- **কোড অংশ:**
  ```javascript
  function getAllBatchPasswords() {
    return {
      "hsc24": "dc24hall",
      "hsc25": "dc25hall",
      "hsc26": "dc26hall",
      "hsc27": "102103104",
      ...
    };
  }
  function getMasterPassword() {
    return cmsAdminSettings?.master_password || "102103104";
  }
  ```
- **সমস্যা:** যেকোনো ভিজিটর ব্রাউজারের Inspect Element / DevTools খুলে কোড সার্চ করে সরাসরি মাস্টার পাসওয়ার্ড ও সব ব্যাচের পাসওয়ার্ড দেখতে পাচ্ছে।

### ৩. Sanity GROQ কুয়েরিতে `adminSettings` এর সমস্ত ডাটা পাবলিকলি এক্সপোজড
- **ফাইল:** [`dc-hall/js/sanity-client.js`](file:///c:/Users/USER/Downloads/%23%23aicode/DC-hall%20(sanity)/dc-hall/js/sanity-client.js#L14)
- **সমস্যা:** `*[_type == "adminSettings"][0]` কুয়েরি করা হচ্ছে কোনো প্রজেকশন ছাড়া। এর ফলে Sanity-তে সেট করা `master_password` ফিল্ড সরাসরি সাধারণ ব্রাউজারের Network ট্যাবে JSON আকারে চলে আসছে।
- **সমাধান:** GROQ কুয়েরি থেকে `master_password` বাদ দেওয়া অথবা Sanity Private Dataset ব্যবহার করা।

### ৪. ফলস ক্লায়েন্ট-সাইড অ্যাক্সেস কন্ট্রোল (Client-Side Bypassing)
- **সমস্যা:** লগইন না করা সত্ত্বেও Sanity থেকে সম্পূর্ণ `students` লিস্ট (মোবাইল নম্বর, অভিভাবকের ফোন, রক্তের গ্রুপ, রেজাল্ট) ব্রাউজারে ডাউনলোড হয়ে যাচ্ছে। শুধু CSS দিয়ে `display: none` করে রাখা হচ্ছে।
- **ঝুঁকি:** কনসোলে `sanityData.students` লিখলেই যে কেউ সমস্ত ছাত্র ও তাদের পরিবারের গোপন নম্বর পেয়ে যায়।
- **সমাধান:** সেনসিটিভ ডাটা (ফোন নম্বর) মাস্ক করে পাঠানো বা Netlify Serverless Function এর মাধ্যমে ফিল্টার করে সরবরাহ করা।

---

## 📋 সিকিউরিটি অ্যাকশন আইটেমস ও চেকলিস্ট

- [x] **অ্যাকশন ১:** `service_account.json` রুট থেকে সরিয়ে সম্পূর্ণ প্রাইভেট ফোল্ডারে নেওয়া এবং `netlify.toml`-এ অ্যাক্সেস ব্লক রুল যোগ করা।
- [x] **অ্যাকশন ২:** `sanity-client.js`-এর GROQ কুয়েরি থেকে `adminSettings.master_password`, `batch_passwords`, `batch_admin_emails`, এবং `moderator_emails` ফিল্ড পুরোপুরি বাদ দেওয়া।
- [x] **অ্যাকশন ৩:** `app.js` থেকে হার্ডকোডেড প্লেইনটেক্সট পাসওয়ার্ড সরিয়ে ক্রিপ্টোগ্রাফিক একমুখী হ্যাশ ভেরিফিকেশন (SHA-256) এবং সার্ভারলেস অথ ফাংশন (`netlify/functions/auth.mjs`) বাস্তবায়ন।
- [x] **অ্যাকশন ৪:** `netlify.toml`-এ রিডাইরেক্ট রুল যোগ করে `/scripts/*` এবং ইন্টারনাল ফাইলগুলোর সরাসরি এক্সেস ব্লক করা।

---

## 📝 পরিবর্তন লগ ও ভার্সন হিস্ট্রি (Change Log & Version History)
*প্রতিবার সিকিউরিটি সংক্রান্ত যেকোনো ফাইল পরিবর্তন করলে এখানে ভার্সন নম্বর ও তারিখসহ আপডেট যোগ হবে।*

- **[v8.1] — ২০২৬-১১-০৮:** প্রাথমিক সিকিউরিটি অডিট সম্পন্ন। ৪টি বড় সিকিউরিটি দুর্বলতা (প্রাইভেট কি এক্সপোজার, ক্লিয়ারটেক্সট পাসওয়ার্ড, স্যানিটি কুয়েরি লিক ও ক্লায়েন্ট সাইড বাইপাস) চিহ্নিত করা হয়েছে।
- **[v8.2] — ২০২৬-১১-০৮:**
  1. `service_account.json` রুট থেকে নিরাপদ ফোল্ডার `scripts/credentials/` এ সরানো হয়েছে এবং `.gitignore` এ যোগ করা হয়েছে।
  2. `netlify.toml`-এ `/scripts/*` ব্লকিং রুল যুক্ত করা হয়েছে যাতে ওয়েব থেকে ডাউনলোড করা অসম্ভব হয়।
  3. `sanity-client.js`-এ GROQ কুয়েরি স্যানিটাইজ করা হয়েছে; `adminSettings`, `batchConfigs` ও `siteSettings` থেকে সব ধরনের মাস্টার কি, ব্যাচ পাসওয়ার্ড ও অ্যাডমিন ইমেইল এক্সপোজার বন্ধ করা হয়েছে।
  4. `app.js` থেকে সব হার্ডকোডেড প্লেইনটেক্সট পাসওয়ার্ড মুছে ফেলে শূন্য-ডিপেন্ডেন্সি ক্রিপ্টোগ্রাফিক SHA-256 হ্যাশ ভ্যালিডেশন এবং লিগ্যাসি কি অটো-মাইগ্রেশন যুক্ত করা হয়েছে।
  5. সার্ভার-সাইড অথেনটিকেশনের জন্য ডেডিকেটেড নেটলিফাই সার্ভারলেস ফাংশন `netlify/functions/auth.mjs` যুক্ত করা হয়েছে।
