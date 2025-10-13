//Chạy server (entry point)
import app from './app';

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running');
});
