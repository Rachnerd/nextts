import routes from "next-routes";

/**
 * TS types do not seem to match properly.
 */
const router: routes = ((routes as any) as () => routes)();

const config = router.add("index", "/").add("search", "/search");

export default config;
