```txt
tree ./firestore
./firestore
├── firestore.main.rules
├── functions
│   ├── firestore.auth.rules
│   ├── firestore.index.rules
│   └── firestore.resource.rules
└── hero
    ├── functions.rules
    ├── index.rules
    └── operation.rules
```

- `npm run frb -- bundle --only firestore` -> firestore.rules
- `npm run frb -- bundle --only firestore --doc true` -> firestore.doc.rules
