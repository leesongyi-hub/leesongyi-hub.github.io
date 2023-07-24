

$(document).ready(function(){	
	// [부트스트랩] 툴팁-아이콘라벨
	$("[data-toggle=tooltip]").tooltip({
		trigger: 'hover',
		template: '<div class="tooltip tooltip_label" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
	});
	// [부트스트랩] 툴팁-각주
	$( "[id^=tooltip]" ).tooltip({
		position: {
			my: "right bottom",
			at: "center top"
		},
		trigger: 'hover',
		html: true,
		template: '<div class="tooltip footnote" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
	});
	// [부트스트랩] 기본툴팁
	$("[data-tooltip=tooltip_txt]").tooltip({
		position: {
			my: "right bottom",
			at: "center top"
		},
		trigger: 'hover',
		html: true,
		template: '<div class="tooltip footnote bs-tooltip-left" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
	});

	// [부트스트랩] 2중 모달
	$(document).on('show.bs.modal', '.modal', function() {
		const zIndex = 1040 + 10 * $('.modal:visible').length;
		$(this).css('z-index', zIndex);
		setTimeout(function() { $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack')});
	});

	//Top으로 버튼 초기진입시 미노출
	var $topBtn = $('.btn_top');

	$('main').scroll(function() {
		
		if ($('main').scrollTop() > 200) {
			$topBtn.addClass('on');
		} else {
			$topBtn.removeClass('on');
		}
	});

	//Top으로
	$topBtn.on('click', function(e){
	  	e.preventDefault();		
	  	$('main').animate({scrollTop:0}, '300');
	});

	//버튼에 on ui
	$('.toggleBtn').on('click', function(){
		btnToggleOnClass($(this));
	});

	//아코디언
	$('.drag_box .btn_arr').on('click', function(){
		$(this).closest('.drag_box').toggleClass('on');
	});

	//아코디언 전체 리스트 컨트롤
	$('.slideDown_btn_box button').on('click', function(){
		
		$('.drag_box').removeClass('on');
		$(this).children('.tooltip_label_bot').text('목록 전체 열기');

		if( $(this).hasClass('on') ){			
			$('.drag_box').removeClass('on');
			$(this).children('.tooltip_label_bot').text('목록 전체 열기');
		}else{
			$('.drag_box').addClass('on');
			$(this).children('.tooltip_label_bot').text('목록 전체 닫기');
		}
	});

	//lnb 영역 토글
	$('.ico_fold').on('click', function(){
		$(this).closest('aside').toggleClass('fold');
	});

	//좌측 사이드바 사이즈 조절
	$(".resizable").resizable(
		{
			autoHide: true,
			handles: 'e',
			resize: function(e, ui) 
			{
				var parent = ui.element.parent();
				
				var remainingSpace = parent.width() - ui.element.outerWidth(),
					divTwo = ui.element.next(),
					divTwoWidth = (remainingSpace - (divTwo.outerWidth() - divTwo.width()))/parent.width()*100+"%";
					divTwo.width(divTwoWidth);
			},
			stop: function(e, ui) 
			{
				var parent = ui.element.parent();
				ui.element.css(
				{
					width: ui.element.width()/parent.width()*100+"%",
				});
			}
	});

	//드래그로 위치 변경
	$(".sortable,.sortable2").sortable({
		handle: ".btn_drag",
		cancel: ".txt_area",
		axis: 'y',
		placeholder: "ui-state-highlight",
		forcePlaceholderSize: true
	});

	//드래그로 위치 변경 - 내부 리스트 영역
	$( ".drag_area" ).sortable({
		handle: ".btn_drag",
		cancel: ".txt_cont",
		axis: 'y',
		placeholder: "ui-state-highlight",
		forcePlaceholderSize: true
	});

	//목차 아웃링크버튼 부모요소 이벤트 전파 막기
	$('.index_navi li .ico_outlink').on('click', function(e){
		e.stopPropagation();
		return false;
	});

	// 목차 스크롤 이동
	$('.index_navi a').on('click', function(e){
		e.preventDefault();
		
		var $focusCon = $(this.hash);

		//네비게이션 active
		$(this).addClass('active');
		$('.index_navi a').not(this).removeClass('active');
		
		//해당 목차 닫혀 있으면 열기
		boxFocusOpen($focusCon);

		//목차 focus
		$focusCon.addClass('active', activeRemoveBack($focusCon) );
		$('.tit_area').not($focusCon).removeClass('active');
	});

	//각주 - 각주에서 리스트 이동 시 목차 닫혀 있으면 열기
	$('.footnote a').on('click', function(e){
		e.preventDefault();

		var $focusCon = $(this.hash);

		//해당 목차 닫혀있으면 열기
		boxFocusOpen($focusCon);
	});

  $('.footnote a, .index_navi a').on('click', function(e) {
    e.preventDefault();
    
    var targetId = $(this).attr('href');
    var targetOffset = $(targetId).offset().top;
    var scrollTop = $('main').scrollTop();
    
    var scrollTo = targetOffset + scrollTop - 76;
    
    $('main').animate({
      scrollTop: scrollTo
    }, 500);
  });

	//카테고리 아코디언
	$('.tree .btn_acco').on('click', function(){
		$(this).closest('li').toggleClass('on');
	});

	//메인 트리 구조 들여쓰기
	$('.index_navi ul').each(function (index , item) {
		index += 1;
		$(item).addClass('d' + index);
		$('.d' + index).css('text-indent',  index * 20 + 'px');
	});
});

function btnToggleOnClass(target){
	$(target).toggleClass('on');
}

function activeRemoveBack($focusCon) {
	setTimeout(function() {
		$focusCon.removeClass('active');
	}, 1600 );
}

function boxFocusOpen(hash){	
	if( hash.closest('.drag_box').hasClass('on') == false){
		hash.closest('.drag_box').addClass('on');
	}
}

let windowResponsive = function() {
	const wrapper = document.getElementById('wrapper');
	
	// 리사이즈 너비 체크
	window.addEventListener('resize', function(){
		windowWidthCheck(768, 'mo');
		windowWidthCheck(1023, 'pad');
	});

	// 초기 진입 시 너비 체크
	windowWidthCheck(768, 'mo');
	windowWidthCheck(1023, 'pad');

	function windowWidthCheck(width, className) {
		if (window.innerWidth <= width) {
			wrapper.classList.add(className);
		} else {
			wrapper.classList.remove(className);
		}
	}
}

//트리영역 마우스로 터치 드래그
let mouseDragX = function() {	
		
	const slider = document.querySelector('.category_tree');
	let isDown = false;
	let startX;
	let scrollLeft;		

	if(slider){
		slider.addEventListener('mousedown', function(e) {
			isDown = true;
			slider.classList.add('active');
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});
		slider.addEventListener('mouseleave', function(e) {
			isDown = false;
			slider.classList.remove('active');
		});
		slider.addEventListener('mouseup', function(e) {
			isDown = false;
			slider.classList.remove('active');
		});
		slider.addEventListener('mousemove', function(e) {
			if(!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 3; //scroll-fast
			slider.scrollLeft = scrollLeft - walk;	  
		});
	};
};

//슬라이드
let carouselSlider = function() {
	let prevBtn = document.getElementById('prev');
	let ntexBtn = document.getElementById('next');
	let slideIndex = 1;
	
	if(prevBtn || ntexBtn) {

		showSlides(slideIndex);
		// 다음 슬라이드 표시
		function nextSlide() {
			showSlides(slideIndex += 1);
		}

		// 이전 슬라이드 표시
		function previousSlide() {
			showSlides(slideIndex -= 1);
		}

		// 슬라이드 기능
		function showSlides(n) {
			let slides = document.getElementsByClassName("slider_item");
			let itemTotalCount = slides.length;
			
			if (n > slides.length) {
				slideIndex = 1
			}
			if (n < 1) {
				slideIndex = slides.length;
			}
		
			for (var i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
			}  
			slides[slideIndex - 1].style.display = "block"; 
			
			document.getElementById('totalIndex').innerText = itemTotalCount;
			document.getElementById('currentIndex').innerHTML = slideIndex;
		}

		// 이전 버튼 클릭이벤트
		prevBtn.addEventListener('click', function(e) {
			previousSlide();
		});

		// 다음 버튼 클릭이벤트
		ntexBtn.addEventListener('click', function(e) {
			nextSlide();
		});
	}	
}

windowResponsive();
mouseDragX();
carouselSlider();


//퍼블리싱본만 필요
function includeHTML(){
	let z, elmnt, file, xhttp;

	z = document.getElementsByTagName("*");
	
	for (let i = 0; i < z.length; i++) {
		elmnt = z[i];
		file = elmnt.getAttribute("data-include");
		
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {elmnt.innerHTML = this.responseText;}
					if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
					/* Remove the attribute, and call this function once more: */
					elmnt.removeAttribute("data-include");
					includeHTML();
				}//if
			}//onreadystatechange

			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}//if - file
	}//for
}//includeHTML

/* ✨ 실행 */
window.addEventListener('DOMContentLoaded', function() {
	includeHTML();
});


/*
	통합검색,
	메인페이지 관련 스크립트 모음
*/

var UI = {
	repositoryListMore: {
		init: function (){
			//저장소 리스트 접고 펼치기
			$('.repo_area .btn_more').on('click', function(){
				$(this).parents('.repo_head').toggleClass('on');
			});

			// 저장소 필터 높이가 40px보다 작거나 같으면 '전체보기' 버튼 미노출
			$('.chip_area').each(function(index, item) {
				$(item).siblings('.btn_more').toggle($(item).height() > 40);
			});
		}
	},
	repositorySwiper: {
    init: function () {
			//Swiper 1920px ~ 769px까지 기능 사용. 768px이하일때 리셋
			$(window).on('resize', function () {
				ww = $(window).width();
				initSwiper();
			});

			function initSwiper() {
				if (ww > 768 && mySwiper == null) {
					mySwiper = new Swiper(".swiper-container", {
						loop: false,
						slidesPerView: 3,
						spaceBetween: 24,
						breakpoints: {
							1024: {
								slidesPerView: 2,
								spaceBetween: 24,
							},
						},
						pagination: {
							el: '.swiper-pagination',
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},      
					});
				} else if (ww <= 768 && mySwiper != null) {
					mySwiper.destroy();
					mySwiper = null;
				}
			}

			// 초기 실행
			var ww = $(window).width();
			var mySwiper = null;
			initSwiper();
		}
	},
  treeAccordion: {
    init: function () {
			//필터 아코디언
      $('.tree_listItem .btn_doc').on('click', function () {
        $(this).parent('.tree_listItem').toggleClass('on');
      });
    }
  },
	customSelect: {
		init: function () {
			//커스텀셀렉트
			var $customSelectArea = $('.customSelect_area');
			var $customSelect = $customSelectArea.find('.customSelect');
			var $customSelectList = $customSelectArea.find('.customSelect_list');
			var $customSelectOption = $customSelectArea.find('.customSelect_option');
			
			$customSelect.on('click', function() {
				var $select = $(this);
				var $list = $select.siblings('.customSelect_list');
				
				$select.toggleClass('selected');
				$list.toggle($select.hasClass('selected'));
			});
			
			$customSelect.on('focusin', function() {
				$(this).siblings('.customSelect_list').show();
			});
			
			$customSelect.on('focusout', function() {
				var $select = $(this);
				var $list = $select.siblings('.customSelect_list');
				
				if (!selectFlag) {
					$list.hide();
				}
				$select.removeClass('selected');
			});
			
			$customSelectOption.on('mouseenter', function() {
				selectFlag = true;
			});
			
			$customSelectOption.on('mouseout', function() {
				selectFlag = false;
			});
			
			$customSelectOption.on('click', function() {
				var $option = $(this);
				var $area = $option.parents('.customSelect_area');
				var $text = $area.find('.customSelect_text');
				var $origin = $area.find('.select_origin');
				var value = $option.attr('value');
				
				$text.text($option.text());
				$origin.val(value);
				$customSelectList.hide();
				
				$origin.find('option').each(function(index, el) {
					if ($(el).attr('value') == value) {
						$(el).attr('selected', 'selected');
					} else {
						$(el).removeAttr('selected');
					}
				});
			});
		}
	},
	filterToggle:{
		init: function () {
		  //필터토글			
			var backdropAdded = false;

			//모바일 토글필터
			function toggleFilterMobile() {
				$('.btn_filter').on('click', function() {
					$(this).parents('.search_page').addClass('expend');
					$('body').addClass('modal-open');
					if (!backdropAdded) {
						$('body').append('<div class="modal_overlay"></div>');
						backdropAdded = true;
					}
				});
		
				$('.filter .btn_close').on('click', function() {
					$(this).parents('.search_page').removeClass('expend');
					$('body').removeClass('modal-open');
					if (backdropAdded) {
						$('.modal_overlay').remove();
						backdropAdded = false;
					}
				});
			}
		
			//PC화면 토글필터
			function toggleFilterDesktop() {
				$('.search_page').removeClass('expend');
				$('body').removeClass('modal-open');
				$('.modal_overlay').remove();
		
				$('.filter .btn_fold').off('click').on('click', function() {
					$(this).parents('.search_page').toggleClass('fold');
				});
			}
		
			function handleResize() {
				var isWindowWidth = window.innerWidth < 1024;
				if (isWindowWidth) {
					toggleFilterMobile();
				} else {
					toggleFilterDesktop();
				}
			}
		
			//브라우저 리사이징 시 토글필터 실행
			$(window).on('resize', function() {
				handleResize();
			});
		
			//초기접속 시 토글필터 실행
			handleResize();
		}
	},	
	filterListMore:{
		init: function () {
			//검색필터 리스트 더보기/간략보기
			$('.filterComp_list').each(function(index, item) {
				var $lnbList = $(item);
				var liCount = $lnbList.children('li').length;
				var $btnMore = $lnbList.next('.btn_more');
				var $btnLabel = $btnMore.children('.label');
		
				//리스트 6개부터 버튼 노출
				if (liCount <= 5) {
					$btnMore.css('display', 'none');
				} else {
					$lnbList.children('li').slice(5).css('display', 'none');
				}

				$btnMore.on('click', function() {
					if ($btnMore.hasClass('on')) {
						$lnbList.children('li').slice(5).css('display', 'none');
						$btnMore.removeClass('on');
						$btnLabel.text('더보기');
						$lnb_list.slideUp();
					} else {
						$lnbList.children('li').slice(5).css('display', 'block');
						$btnMore.addClass('on');
						$btnLabel.text('간략보기');
						$lnb_list.slideDown();
					}
				});
			});
		}
	},	
	filterCompAccordion:{
		init: function () {
			//검색필터 아코디언
			$('.filterComp').addClass('on');

			$('.btn_aco').on( "click", function() {
				var $filterComp = $(this).parent('.filterComp');
				var $slide_target = $(this).next('.filterComp_body');
				if( $filterComp.hasClass('on') ){
					$filterComp.removeClass('on')
					$slide_target.slideUp('fast')
				}else{
					$filterComp.addClass('on')
					$slide_target.slideDown('fast')
				}
			});
		}
	},
	subInfoAccordion:{
		init: function (){
			//부가정보영역 펼침 토글
			$('.subInfo_area .btn_more').on('click', function(){
				$(this).parent('.subInfo_area').toggleClass('on');
			});

			//Function : 부가정보영역 높이값 감지하여 펼침 버튼 토글
			function toggleListVisible() {
					$('.subInfo_area .inner').each(function(index, item) {
					$(item).siblings('.btn_more').toggle($(item).height() > 40);
				});
			}
			//Function 실행
			toggleListVisible(); 
			$(window).on('resize', toggleListVisible);
		}
	},
	detailSearch: {
		init: function (){
			//상세검색버튼 토글
			$('.btn_detailSearch').on('click', function() {
				var useElement = $(this).find('use');
				var currentHref = useElement.attr('xlink:href');
				var btnTxt = $(this).children('.label');
	
				if (currentHref === '#ico_minus') {
					useElement.attr('xlink:href', '#ico_plus');
					btnTxt.text('상세검색 열기');
				} else {
					useElement.attr('xlink:href', '#ico_minus');
					btnTxt.text('상세검색 닫기');
				}
				$('.detailSearch_area').slideToggle();
			});
	
			//상세검색창 닫기
			$('.detailSearch_area .btn_close').on('click', function() {
				$(this).parents('.detailSearch_area').slideUp();
				$('.btn_detailSearch .label').text('상세검색 열기');
				$('.btn_detailSearch use').attr('xlink:href', '#ico_plus');
			});
	
			//상세검색창 열기
			$(window).on('scroll', function() {
				var scrollTop = $(window).scrollTop();
				var detailSearchHeight = $('.detailSearch_area').outerHeight();
	
				if (scrollTop > detailSearchHeight) {
					$('.detailSearch_area').addClass('fix');
				} else {
					$('.detailSearch_area').removeClass('fix');
				}
			});
		}
	},
	filePreviewToggle: {
		init: function (){
			//첨부파일탭 리스트 미리보기영역 펼침 토글
			$('.type_file .btn_more').on('click', function(){
				$(this).siblings('.inner').scrollTop(0);
				$(this).parent('.preview_area').toggleClass('on');          
			});
		}
	}
};

$(function () {
	UI.repositorySwiper.init();
	UI.repositoryListMore.init();
  UI.treeAccordion.init();
  UI.customSelect.init();
	UI.filterToggle.init();
	UI.filterListMore.init();
	UI.filterCompAccordion.init();
	UI.subInfoAccordion.init();
	UI.detailSearch.init();
	UI.filePreviewToggle.init();
});
