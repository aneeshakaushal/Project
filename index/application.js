

<script type="text/x-handlebars" id="application">
    <nav class="navbar navbar-default navbar-inverse navbar-fixed-top" role="navigation">
				<div id="myAlert" class="alert alert-danger fade"></div>
		<div class="navbar-header">
			<div class=" lines col-xs-6 ">
				<span id="arrow-right" class="glyphicon glyphicon-arrow-right"></span></div>
			<button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			
		</div>
		<div class="navbar-collapse collapse" id="collapse">
			<ul class="nav navbar-nav">
				<li class="ghost "><A HREF="home.html">Home &nbsp;<span class="glyphicon glyphicon-home"></span></A></li>				
			</ul>
			<ul class="nav navbar-nav navbar-right" id="#right_nav_menu">

			<li class="ghost"><A HREF="#">Settings &nbsp;<span class="glyphicon glyphicon-wrench"></span></a></li>
			<li class="ghost"><A HREF="#">Logout &nbsp;<span class="glyphicon glyphicon-log-out"></span></a></li>
			<li><A HREF="#"><i>Aneesha Kaushal &nbsp;</i></a></li>
			<li ><A HREF="#" id="date"><i> &nbsp;</i></a></li>
		</ul>
		</div>
	</nav>	
			<article class="col-lg-9 col-sm-8 col-xs-10 col-lg-push-1 col-sm-push-4 col-xs-push-2" >
			{{outlet}}
			</article>			
			<aside id="side_bar">
			<div id='cssmenu'>
				<ul class="nav nav-pills nav-stacked hidden-xs">
				   <li id="view">{{#link-to 'subscriber'}}Subscriber <span id="subscriber_count"></span>&ensp;&ensp;<span class="pull-right glyphicon glyphicon-folder-close"></span> {{/link-to}}</li>
				   <li id="view_user">{{#link-to 'users'}}Users <span id="user_count"></span>&ensp;&ensp;<span class=" pull-right glyphicon glyphicon-user"></span>{{/link-to}}</li>
				   <li id="view_service">{{#link-to 'services'}}Services <span id="service_count"></span>&ensp;&ensp;<span class="pull-right glyphicon glyphicon-flash"></span>{{/link-to}}</li>   
				</ul>
		`		<ul class=" nav nav-pills nav-stacked visible-xs" id="#icon_bar">
						 <li>{{#link-to 'subscriber'}}<span class="glyphicon glyphicon-folder-close"></span> {{/link-to}}</li>
				   		<li>{{#link-to 'users'}}<span class="glyphicon glyphicon-user"></span>{{/link-to}}</li>
				  		 <li>{{#link-to 'services'}}<span class="glyphicon glyphicon-flash"></span>{{/link-to}}</li>   
					</ul>
				</div>
			</div>
		</aside>
</script>