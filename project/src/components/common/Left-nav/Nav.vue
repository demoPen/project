<template>
<div class="navbar">
			<input type="checkbox" id="checkbox" />
			<!-- 复选框的id属性值和label元素的for属性值必须是相同的,才能够通过点击label选中复选框 -->
			<label for="checkbox">
				<i class="fa fa-bars"></i>
			</label>
			<ul>
				<li>
					<img src="images/1.jpg" alt="" />
					<span>欢迎您! 管理员</span>
				</li>
				<li>
					<a href="javascript:void(0)">
						<i class="fa fa-home"></i>
						<span>后台首页</span>
					</a>
				</li>
				<li>
					<a href="javascript:void(0)">
						<i class="fa fa-sitemap"></i>
						<span>商品列表</span>
					</a>
				</li>
				<li>
					<a href="javascript:void(0)">
						<i class="fa fa-user"></i>
						<span>用户列表</span>
					</a>
				</li>
				<li>
					<a href="javascript:void(0)">
						<i class="fa fa-shopping-cart"></i>
						<span>订单列表</span>
					</a>
				</li>
				<li>
					<a href="javascript:void(0)">
						<i class="fa fa-windows"></i>
						<span>功能列表</span>
					</a>
				</li>
			</ul>
		</div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
	/* 相对定位 */
	position: relative;
	/* 元素的宽度占浏览器可视区域的宽度 */
	/* width: 10%; */
  max-width: 300px;
}
.navbar input {
	/* 隐藏元素 */
	display: none;
}
.navbar label {
	position: absolute;
	top: 0;
	left: 70px;
	width: 40px;
	height: 43px;
	padding-left: 20px;
	font-size: 30px;
	color: #5a738e;
	background-color: #ededed;
	border: 1px solid #d9dee4;
	/* 鼠标移入变小手 */
	cursor: pointer;
	/* 加过渡 */
	transition: all 0.5s;
}
.navbar ul {
	/* 再加个溢出隐藏 */
	overflow: hidden;
	/* 删除li前面的小黑点 */
	list-style: none;
	width: 70px;
	/* 高度占浏览器可视区域的高度 */
	height: 100vh;
	background-color: #2a3f54;
	transition: all 0.5s;
}
.navbar ul li {
	height: 70px;
	margin-bottom: 10px;
}
/* :first-child选择器 选择到ul下面的第一个元素 */
.navbar ul li:first-child {
	/* 弹性布局 让元素在该盒子内垂直+水平居中 */
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 10px;
}
.navbar ul li:first-child img {
	width: 50px;
	border-radius: 50%;
}
.navbar ul li:first-child span {
	/* 先把文字隐藏起来 */
	display: none;
	color: #fff;
	/* 文字禁止换行 */
	white-space: nowrap;
	padding-left: 10px;
}
.navbar ul li a {
	/* 弹性布局 */
	display: flex;
	justify-content: center;
	align-items: center;
	/* 这个属性改变了弹性盒子的主轴方向 现在主轴方向向下 元素也就垂直排列 */
	flex-direction: column;
	width: 100%;
	height: 100%;
	color: #d1d1d1;
	/* 取消文字的下划线 */
	text-decoration: none;
}
.navbar ul li a i {
	font-size: 25px;
	margin-bottom: 10px;
}
.navbar ul li a span {
	font-size: 10px;
	/* 给这个文字也加禁止换行 不然切换的一瞬间会垂直排列 */
	white-space: nowrap;
}
.navbar ul li a:hover {
	color: #fff;
	background-color: #35495d;
}
/* :checked选择器判断复选框是否被选中 */
/* +是相邻兄弟选择器 找到了input的下一个兄弟label */
.navbar input:checked + label {
	left: 200px;
}
/* ~也是兄弟选择器 但是可以找到隔了几代的兄弟 */
.navbar input:checked ~ ul {
	width: 200px;
}
.navbar input:checked ~ ul li:first-child {
	/* 改变了弹性项目在弹性盒子内的水平排列方式为从开头排序 */
	justify-content: flex-start;
}
.navbar input:checked ~ ul li:first-child span {
	/* 文字显示 */
	display: block;
}
.navbar input:checked ~ ul li a {
	/* 改变了主轴的方向为默认值 水平排列 */
	flex-direction: row;
	/* 改变了弹性项目在弹性盒子内的水平排列方式为从开头排序 */
	justify-content: flex-start;
}
.navbar input:checked ~ ul li a i {
	font-size: 18px;
	margin: 0 15px;
}
.navbar input:checked ~ ul li a span {
	font-size: 13px;
}
</style>