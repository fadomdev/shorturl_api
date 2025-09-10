import app from './app';
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || 'http://localhost';
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor local en ${APP_URL}:${PORT}`);
    });
}
export default app;
