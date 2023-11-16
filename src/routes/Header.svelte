<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import saltLogo from '../assets/images/icons/SaltLogo.svg';
	import { Label, Input, Button, Modal, Textarea, Select } from 'flowbite-svelte';
</script>

<!-- Header  -->
<Navbar let:NavContainer color="primary" class="py-6">
	<NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
		<NavBrand href="/">
			<img src={saltLogo} alt="Salt Logo" class="w-24 h-24 dark:white-logo" />
		</NavBrand>
		<NavHamburger />
		<NavUl class="flex align-middle">
			<NavLi href="/">Rankings</NavLi>
			<NavLi href="/compare">Compare</NavLi>
			<NavLi href="javascript:void(0);">Add New</NavLi>
		</NavUl>
	</NavContainer>
</Navbar>
