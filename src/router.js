import DefProtActions from "./components/DefProtActions";

const router = {
    home: () => '/',
    logs: (page = null, status = null, categories = null) => '/logs/' + ((
        page === null && status === null && categories === null) ? ':data([\\w\\-\\/+]+={0,2})?' :
            btoa(JSON.stringify({page: page, status: status || [], categories: categories || []}))),
    flows: () => '/flows',
    defProtActions: () => '/def-prot-actions'
};

export default router;