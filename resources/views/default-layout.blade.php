<!--Header-->
@include('partials.header')

<!--Navbar-->
@include('partials.navbar')

<div class="page" id="app">
    <div class="page-content container">
        <!-- CONTENT -->
        @yield('content')
    </div>
</div>

<!--Footer-->
@include('partials.footer')