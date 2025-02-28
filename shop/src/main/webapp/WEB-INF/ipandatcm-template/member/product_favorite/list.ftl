<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="format-detection" content="telephone=no">
	<meta name="author" content="ixincheng">
	<meta name="copyright" content="SHOP++">
	<title>${message("member.productFavorite.list")}</title>
	<link href="${base}/favicon.ico" rel="icon">
	<link href="${base}/resources/common/css/bootstrap.css" rel="stylesheet">
	<link href="${base}/resources/common/css/font-awesome.css" rel="stylesheet">
	<link href="${base}/resources/common/css/iconfont.css" rel="stylesheet">
	<link href="${base}/resources/common/css/base.css" rel="stylesheet">
	<link href="${base}/resources/shop/css/base.css" rel="stylesheet">
	<link href="${base}/resources/member/css/base.css" rel="stylesheet">
	<link href="${base}/resources/member/css/product_favorite.css" rel="stylesheet">
	<!--[if lt IE 9]>
		<script src="${base}/resources/common/js/html5shiv.js"></script>
		<script src="${base}/resources/common/js/respond.js"></script>
	<![endif]-->
	<script src="${base}/resources/common/js/jquery.js"></script>
	<script src="${base}/resources/common/js/bootstrap.js"></script>
	<script src="${base}/resources/common/js/bootstrap-growl.js"></script>
	<script src="${base}/resources/common/js/bootbox.js"></script>
	<script src="${base}/resources/common/js/jquery.cookie.js"></script>
	<script src="${base}/resources/common/js/underscore.js"></script>
	<script src="${base}/resources/common/js/url.js"></script>
	<script src="${base}/resources/common/js/velocity.js"></script>
	<script src="${base}/resources/common/js/velocity.ui.js"></script>
	<script src="${base}/resources/common/js/base.js"></script>
	<script src="${base}/resources/member/js/base.js"></script>
</head>
<body class="member product-favorite">
	[#include "/shop/include/main_header.ftl" /]
	<main>
		<div class="container">
			<div class="row">
				<div class="col-xs-2">
					[#include "/member/include/main_menu.ftl" /]
				</div>
				<div class="col-xs-10">
					<form action="${base}/member/product_favorite/list" method="get">
						<input name="pageNumber" type="hidden" value="${page.pageNumber}">
						<div class="panel panel-default">
							<div class="panel-heading">${message("member.productFavorite.list")}</div>
							<div class="panel-body">
								[#if page.content?has_content]
									<ul class="product-favorite-list clearfix">
										[#list page.content as productFavorite]
											<li>
												[#if !productFavorite.product.isMarketable]
													<em>${message("member.productFavorite.productNotMarketable")}</em>
												[#elseif !productFavorite.product.isActive]
													<em>${message("member.productFavorite.productNotActive")}</em>
												[/#if]
												<a href="[#if productFavorite.product.isMarketable && productFavorite.product.isActive]${base}${productFavorite.product.path}[#else]javascript:;[/#if]" target="_blank">
													<img class="img-responsive center-block" src="${productFavorite.product.thumbnail!setting.defaultThumbnailProductImage}" alt="${productFavorite.product.name}">
												</a>
												<h5 class="text-overflow">
													<a href="[#if productFavorite.product.isMarketable && productFavorite.product.isActive]${base}${productFavorite.product.path}[#else]javascript:;[/#if]" title="${productFavorite.product.name}" target="_blank">${productFavorite.product.name}</a>
												</h5>
												<strong class="text-orange-light">${currency(productFavorite.product.price, true)}</strong>
												<div class="action">
													[#if productFavorite.product.isMarketable && productFavorite.product.isActive]
														<a class="btn btn-default btn-xs btn-icon" href="${base}${productFavorite.product.path}" title="${message("common.view")}" target="_blank">
															<i class="iconfont icon-search"></i>
														</a>
													[/#if]
													<a class="btn btn-default btn-xs btn-icon" href="javascript:;" title="${message("common.delete")}" data-action="delete" data-url="${base}/member/product_favorite/delete?productFavoriteId=${productFavorite.id}">
														<i class="iconfont icon-close"></i>
													</a>
												</div>
											</li>
										[/#list]
									</ul>
								[#else]
									<p class="text-gray">${message("common.noResult")}</p>
								[/#if]
							</div>
							[@pagination pageNumber = page.pageNumber totalPages = page.totalPages]
								[#if totalPages > 1]
									<div class="panel-footer text-right clearfix">
										[#include "/member/include/pagination.ftl" /]
									</div>
								[/#if]
							[/@pagination]
						</div>
					</form>
				</div>
			</div>
		</div>
	</main>
	[#include "/shop/include/main_footer.ftl" /]
</body>
</html>