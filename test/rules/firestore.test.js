const fs = require('fs');
const firebase = require('@firebase/rules-unit-testing');

const PROJECT_ID = 'rules-test';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

describe('firestore.rules test', () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: PROJECT_ID,
      rules: fs.readFileSync('./firestore.rules', 'utf8'),
    });
  });
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID });
  });
  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  });
  function adminDb() {
    return firebase.initializeAdminApp({ projectId: PROJECT_ID }).firestore();
  }
  function authedDb(auth) {
    return firebase.initializeTestApp({ projectId: PROJECT_ID, auth: auth }).firestore();
  }

  describe('公開時刻を過ぎたドキュメントを取得', () => {
    beforeEach(async () => {
      const db = adminDb();
      await db
        .collection('articles')
        .doc('article1')
        .set({ publishedAt: new Date(1999, 11, 25) });
    });

    it('getはできる', async () => {
      const db = authedDb();
      const ref = db.collection('articles').doc('article1');
      await firebase.assertSucceeds(ref.get());
    });
    it('listはできない（？）', async () => {
      const db = authedDb();
      const ref = db.collection('articles').where('publishedAt', '<=', firebase.firestore.Timestamp.now());
      await firebase.assertFails(ref.get());
    });
  });
});
