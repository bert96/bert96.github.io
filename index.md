---
layout: default
title: Bert Koster
---
<script>AOS.init();</script>
<div class="home-head">
	<div class="head-overlay">
		<iframe class="headerAnimation" src="{{ site.url }}/assets/js/object.html" width="100%" height="525px" scrolling="no">
		</iframe>
		<div class="head-text-container">
			<div class="person-container">
				<img class="person-icon" data-aos="zoom-in" src="/assets/images/bert.jpg">
			</div>
			<h1 class="head-name questr" data-aos="fade-up">Bert Koster</h1>
			<h2 class="head-undertext questr">
				<p>Front-end developer. HTML5, CSS3, Javascript,</p>
				<p>Jquery, ThreeJS, React.</p>
			</h2>
		</div>
	</div>
	<div class="position-container">
		<div class="portfolio-text text-container purple-container" data-aos="fade-up">
			<h1 class="questr gold">What do I do?</h1>
			<p class="white">If you like to know more about me, then take a look at my portfolio gallery to get a better impression of my current skills as a front-end developer. Besides that, I am always eager to learn something new to develop my skills even more.</p>
			<p class="white">Here are some of my projects.</p>
			<div class="portfolio-box">
				{% for post in site.categories.Portfolio %}
				    {% if post.url %}
				    	<div class="portfolio-container">
					    	<div class="portfolio-item" data-aos="zoom-in-up">
					    		<p class="item-title questr gold">{{ post.title }}</p>
					        	<img src="{{ post.thumbnail }}" />
					        	<div class="project-button-container">
					        		<a href="/{{ post.title }}"><div class="view-project"><i class="fas fa-eye"></i><p>View project</p></div></a>
					        		<a href="{{ post.url }}"><div class="view-code"><i class="fas fa-code"></i><p>View code</p></div></a>
					        	</div>
					    	</div>
				    	</div>
				    {% endif %}
				{% endfor %}
			</div>
		</div>
	</div>
	<div class="text-container" data-aos="fade-up">
		<h1 class="questr purple">Who am I?</h1>
		<p>My name is Bert Koster, and I take interest in front-end webdevelopment. I finished studying Interaction Design at the Hanze Hogeschool in the city of Groningen in the Netherlands.
		</p>
		<p>Being creative and doing personal projects with libraries and frameworks like Three.js and React is something I like to do. One of the things that fascinate me is astronomy and space related things. This is why many of my personal projects are related to that theme. This also helps me to develop myself further as a front-end developer. The skills I learned during my studies, internship and personal projects is something I want to go further with by working for a company as a webdeveloper.
		</p>
	</div>
	<div class="text-container contact" data-aos="fade-up">
		<h1 class="questr purple">Contact</h1>
		<center>
			<p>If you are interested in my work, and like to contact me. You can contact me through linked-in or e-mail address.</p>
		</center>
		<div class="center-content">
			<h2 class="purple">Contact me through linked-in</h2>
			<a target="_blank" href="https://www.linkedin.com/in/bert-koster-34254699/"><img class="linked-in-logo" src="/assets/images/linked-in.png"></a>
		</div>
		<div class="text-container purple-container form">
			<h2 class="gold">Or message me by mail</h2>
			<h3 class="white">koster_bert@hotmail.com</h3>
			<!-- <form action="mailto:bertkosterdev@gmail.com" method="post" enctype="text/plain">
				<div class="messageform">
					<p class="white">Your name:</p>
					<input type="text" name="name">
					<p class="white" name="mail">E-mail address:</p>
					<input type="text">
					<p class="white">Your message:</p>
					<textarea type="text" name="comment"></textarea>
					<input type="hidden" class="hp" name="hp">
					<div class="position-container">
						<input type="submit" value="Send">
					</div>
				</div>
			</form> -->
		</div>
	</div>
</div>
