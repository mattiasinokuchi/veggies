<script>
	import "../app.css";
	import { page } from '$app/stores';
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>
<nav>
	<a class:active={$page.path.match(/product/)} sveltekit:prefetch href="/product">PRODUCTS</a>
	<a class:active={$page.path.match(/customer/)} sveltekit:prefetch href="/customer">CUSTOMERS</a>
	<a class:active={$page.path.match(/deliver/)} sveltekit:prefetch href="/deliver">DELIVERY</a>
	<a class:active={$page.path.match(/billing/)} sveltekit:prefetch href="/billing">BILLING</a>
</nav>

<slot></slot>

<style>
	nav {
		padding: 2vh;
		box-shadow: 0vw 1vw 1vw 0.2vw lightgray;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	a {
		text-decoration: none;
		color: gray;
		margin: 1vw;
		font-weight: bold;
		font-size: 4vw;
	}
	a.active {
		text-decoration: none;
		color: salmon;
		margin-right: 1rem;
	}
</style>
