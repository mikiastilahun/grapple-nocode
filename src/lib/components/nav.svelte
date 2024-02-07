<script lang="ts">
	import logo from '$lib/assets/logo.png';
</script>

<nav class="bg-white shadow">
	<div class="max-w-full px-8 mx-8">
		<div class="flex justify-between h-16">
			<div class="flex">
				<div class="flex-shrink-0 flex items-center">
					<a href="https://grapple-solutions.com">
						<img class="h-8 w-auto" src={logo} alt="Workflow logo" />
					</a>
				</div>
			</div>
			<div class="flex-1 flex items-center px-2 justify-end">
				<div class="w-full max-w-32">
					<div class="ml-6 flex space-x-8">
						<a
							href="/components"
							class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Builder
						</a>
						<a
							href="/preview"
							class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Preview
						</a>
						<!-- <a
							href="/modules"
							class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Modules
						</a>
						<a
							href="/components"
							class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Components
						</a>
						<a
							href="/remoteEntry.js"
							class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							remoteEntry.js
						</a>
						<a
							href="/dashboard.json"
							class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							dashboard.json
						</a> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>
