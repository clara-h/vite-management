const product = () => import('../../views/pms/product.vue')
const productDetail = () => import('../../views/pms/productDetail.vue')

export default [
  {
    path: 'pms/product',
    name: 'product',
    component: product
  },
  {
    path: 'pms/productDetail',
    name: 'productDetail',
    component: productDetail
  },
]