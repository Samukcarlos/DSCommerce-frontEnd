import './styles.css'
import * as productService from '../../../services/product-service'
import editIcon from '../../../assets/edite.svg'
import deleteIcon from '../../../assets/delite.svg'
import { useEffect, useState } from 'react';
import { ProductDTO } from '../../../models/product'
import SearchBar from '../../../components/SearchBar';
import ButtonNextPage from '../../../components/ButtonNextPage';

type QueryParams ={
  page: number;
  name: string;
}
export default function ProductListing(){

  const [isLastPage, setIsLestPage]= useState(false);  // é a ultama página? caso seja botão carregar mais some

  const [products, setProduct]= useState<ProductDTO[]>([]);

  const [queryParams, setQueryParams]= useState<QueryParams>({
    page: 0,
    name: ""
  });

  useEffect(()=> {
    productService.findPageRequest(queryParams.page, queryParams.name)
    .then(response => {
        const nextPage = response.data.content;
        setProduct(products.concat(nextPage)); //acrescentando itens na página com o carregar mais
        setIsLestPage(response.data.last);
      });

}, [queryParams]); // mudando o status/valor a função é executada (productService)

function handleSearch(searchText: string){
  setProduct([]);
  setQueryParams({...queryParams,page:0, name: searchText});
}


function handleNextPageClick(){
  setQueryParams({...queryParams, page:queryParams.page + 1}); // CARREGAR MAIS
}

    return(
        <main>
        <section id="product-listing-section" className="dsc-container">
          <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>
  
          <div className="dsc-btn-page-container dsc-mb20">
            <div className="dsc-btn dsc-btn-white">Novo</div>
          </div>
  
         <SearchBar onSearch={handleSearch} />
  
          <table className="dsc-table dsc-mb20 dsc-mt20">
            <thead>
              <tr>
                <th className="dsc-tb576">ID</th>
                <th></th>
                <th className="dsc-tb768">Preço</th>
                <th className="dsc-txt-left">Nome</th>
                <th></th>
                <th></th>  
              </tr>
            </thead>
            <tbody>

                {
                  products.map(product => (
                  <tr key={product.id}>
                    <td className="dsc-tb576">{product.id}</td>
                    <td><img className="dsc-product-listing-image" src={product.imgUrl} alt={product.name}/></td>
                    <td className="dsc-tb768">R$ {product.price.toFixed(2)}</td>
                    <td className="dsc-txt-left">{product.name}</td>
                    <td><img className="dsc-product-listing-btn" src={editIcon} alt="Editar"/></td>
                    <td><img className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar"/></td>
                  </tr>
                    ))
                  }             
            </tbody>
          </table>  
          {
               
                !isLastPage &&                
                  <ButtonNextPage onNextPage={handleNextPageClick}/>               
              
              }
        </section>
      </main>
    );
}