
const router = {
    home: () => '/',
    logs: (page = null, status = null, categories = null) => '/logs/' + ((
        page === null && status === null && categories === null) ? ':data([\\w\\-\\/+]+={0,2})?' :
            btoa(JSON.stringify({page: page, status: status || [], categories: categories || []})))
};

export default router;